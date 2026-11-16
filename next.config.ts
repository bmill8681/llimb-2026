import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The password-protected pinball route reads the Unity build from disk at runtime,
  // so make sure those files are bundled with the serverless function on deploy.
  outputFileTracingIncludes: {
    "/public-house-pinball/[[...path]]": ["./app/pinball/**/*"],
  },
};

export default nextConfig;
