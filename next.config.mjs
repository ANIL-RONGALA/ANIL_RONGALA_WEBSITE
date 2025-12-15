const nextConfig = {
  experimental: { typedRoutes: false },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }]
  }
};

export default nextConfig;
