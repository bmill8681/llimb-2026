import type { NextConfig } from "next";

const PINBALL_BUILD = "/public-house-pinball/Build";

// Unity's Brotli-compressed build files need Content-Encoding: br plus the type of the
// file inside the .br, or the Unity loader refuses to start.
const brotliHeaders = (contentType: string) => [
  { key: "Content-Encoding", value: "br" },
  { key: "Content-Type", value: contentType },
];

const nextConfig: NextConfig = {
  // The /public-house-pinball route reads index.html from disk at runtime,
  // so make sure it is bundled with the serverless function on deploy.
  outputFileTracingIncludes: {
    "/public-house-pinball": ["./public/public-house-pinball/index.html"],
  },
  async headers() {
    return [
      {
        source: "/public-house-pinball/:path+",
        headers: [
          { key: "Cache-Control", value: "private, max-age=3600" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: `${PINBALL_BUILD}/:file(.*\\.wasm\\.br)`,
        headers: brotliHeaders("application/wasm"),
      },
      {
        source: `${PINBALL_BUILD}/:file(.*\\.js\\.br)`,
        headers: brotliHeaders("application/javascript"),
      },
      {
        source: `${PINBALL_BUILD}/:file(.*\\.data\\.br)`,
        headers: brotliHeaders("application/octet-stream"),
      },
    ];
  },
};

export default nextConfig;
