import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  // Keep the old Shopify theme URLs working (links, search results, bookmarks).
  async redirects() {
    return [
      { source: "/shop", destination: "/collections/all", permanent: true },
      { source: "/products", destination: "/collections/all", permanent: true },
      { source: "/pages/about-us", destination: "/about", permanent: true },
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/return-and-refund-policy", destination: "/shipping-returns", permanent: false },
    ];
  },
};

export default nextConfig;
