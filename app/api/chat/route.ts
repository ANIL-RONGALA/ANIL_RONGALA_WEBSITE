import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/siteConfig";
import { profileData } from "@/lib/profile";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 4000;

const rateLimitState = new Map<string, { count: number; windowStart: number }>();

const DOCS = {
  streaming: "https://platform.openai.com/docs/guides/streaming",
  responses: "https://platform.openai.com/docs/api-reference/responses",
};

type IncomingMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = rateLimitState.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitState.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count += 1;
  return true;
}

function buildSystemPrompt() {
  const focusAreas = profileData.focusAreas
    .map((area) => `${area.title}: ${area.description}`)
    .join(" | ");
  const highlights = profileData.highlights
    .map((highlight) => `${highlight.title} (${highlight.detail})`)
    .join(" | ");

  return [
    `You are the Live Help Bot for ${siteConfig.siteName}.`,
    "Answer questions about Anil's work, site navigation, projects, and how to reach him.",
    "Keep responses concise, confident, and helpful.",
    `Site tagline: ${siteConfig.tagline}.`,
    `Owner: ${siteConfig.ownerName}.`,
    `Profile headline: ${profileData.headline}.`,
    `Profile summary: ${profileData.summary}.`,
    `Focus areas: ${focusAreas}.`,
    `Highlights: ${highlights}.`,
    `Contact: email ${profileData.links.email}, LinkedIn ${profileData.links.linkedin}, GitHub ${profileData.links.github}.`,
  ].join("\n");
}

function validateMessages(messages: IncomingMessage[]) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return "Invalid messages payload.";
  }
  const totalChars = messages.reduce((sum, message) => sum + message.content.length, 0);
  if (totalChars > MAX_MESSAGE_CHARS) {
    return "Message payload too large.";
  }
  for (const message of messages) {
    if (!message.role || typeof message.content !== "string") {
      return "Invalid message format.";
    }
    if (message.content.length > MAX_MESSAGE_CHARS) {
      return "Message too long.";
    }
  }
  return null;
}

async function streamOpenAIResponse(messages: IncomingMessage[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { error: "OPENAI_API_KEY is not configured." } as const;
  }

  const systemPrompt = buildSystemPrompt();
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      stream: true,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: systemPrompt }],
        },
        ...messages.map((message) => ({
          role: message.role,
          content: [{ type: "input_text", text: message.content }],
        })),
      ],
    }),
  });

  if (!response.ok || !response.body) {
    const details = await response.text();
    return { error: `OpenAI error: ${details}` } as const;
  }

  return { stream: response.body } as const;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return new Response("Rate limit exceeded.", { status: 429 });
  }

  let payload: { messages?: IncomingMessage[] };
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON.", { status: 400 });
  }

  const messages = payload.messages ?? [];
  const validationError = validateMessages(messages);
  if (validationError) {
    return new Response(validationError, { status: 400 });
  }

  const result = await streamOpenAIResponse(messages);
  if ("error" in result) {
    return new Response(result.error, { status: 500 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const openAiStream = result.stream;

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      let closed = false;
      const reader = openAiStream.getReader();

      const safeClose = () => {
        if (closed) return;
        closed = true;
        controller.close();
      };

      const flushBuffer = (chunk: string) => {
        if (closed) return;
        const parts = chunk.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const lines = part.split("\n").filter(Boolean);
          const dataLines = lines
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.replace(/^data:\s?/, ""));
          if (dataLines.length === 0) continue;
          const data = dataLines.join("\n");
          if (data === "[DONE]") {
            safeClose();
            return;
          }
          try {
            const parsed = JSON.parse(data) as { type?: string; delta?: string };
            if (parsed.type === "response.output_text.delta" && parsed.delta) {
              controller.enqueue(encoder.encode(`data: ${parsed.delta}\n\n`));
            }
            if (parsed.type === "response.completed") {
              safeClose();
              return;
            }
          } catch {
            // Ignore non-JSON lines.
          }
        }
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (closed) break;
          buffer += decoder.decode(value, { stream: true });
          flushBuffer(buffer);
        }
      } catch (error) {
        controller.error(error);
      } finally {
        safeClose();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-OpenAI-Docs-Streaming": DOCS.streaming,
      "X-OpenAI-Docs-Responses": DOCS.responses,
    },
  });
}
