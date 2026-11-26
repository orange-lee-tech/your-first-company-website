/** @type {import('next').NextConfig} */
const basePath = (process.env.NEXT_PUBLIC_SITE_BASE_PATH || "").replace(/\/+$/, "");

module.exports = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_SITE_BASE_PATH: basePath },
  images: { unoptimized: true },
};
