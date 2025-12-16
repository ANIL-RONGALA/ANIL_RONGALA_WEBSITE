const nextConfig = {
  experimental: { typedRoutes: false },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
