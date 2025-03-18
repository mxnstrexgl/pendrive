/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // Optimize for Netlify deployment
  output: "standalone",
  
  // Disable image optimization during build to reduce memory usage
  images: {
    unoptimized: true,
  },
  
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
  
  // Disable React strict mode in production to avoid double-rendering
  reactStrictMode: process.env.NODE_ENV !== "production",
};

export default config;
