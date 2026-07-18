/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Pin the workspace root: stray lockfiles in parent directories otherwise
    // make Turbopack misinfer it (breaks asset serving in dev).
    root: import.meta.dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
