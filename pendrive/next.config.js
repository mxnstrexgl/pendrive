/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // Set output directory for production build
  // This ensures compatibility with Netlify deployment
  output: "export",
  
  // Disable image optimization during export
  // This is needed for static exports
  images: {
    unoptimized: true,
  },
  
  // Disable server components for static export
  // Comment this out if you need server components and are using the Netlify adapter
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default config;
