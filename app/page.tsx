import { siteConfig } from "@/lib/siteConfig";

export default function HomePage() {
  return (
    <div className="px-4 py-10 sm:px-8 lg:px-16 space-y-8">
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Digital Neural Board
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
          Welcome to the futuristic interface of {" "}
          <span className="text-primary">{siteConfig.ownerName}</span>
        </h1>
        <p className="text-muted-foreground max-w-xl">
          {siteConfig.tagline}
        </p>
      </section>

      <section className="text-sm text-muted-foreground max-w-2xl space-y-2">
        <p>
          This is the current staging version of my personal website. The focus
          right now is getting a clean, reliable build and deployment pipeline.
        </p>
        <p>
          Sections for projects, research, and experiments will be added and
          refined in future iterations.
        </p>
      </section>
    </div>
  );
}
