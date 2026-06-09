import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — pre-renders every route to plain HTML/CSS/JS at build time.
  // Deployed files are served directly from CDN edge nodes; no serverless
  // functions spin up on each visit, so there is no cold-start delay.
  output: "export",

  // next/image's built-in optimiser needs a running server.
  // With static export we skip server-side resizing and serve images as-is.
  // (Swap to a Cloudinary/imgix loader here when real photos are added.)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
