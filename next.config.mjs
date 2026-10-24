/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev only: hosts (e.g. a LAN IP for testing on a phone) allowed to load
  // dev resources. Without this the page never hydrates when opened via a
  // non-localhost origin, so the scroll-jacking gallery appears frozen.
  // Usage: ALLOWED_DEV_ORIGINS=192.168.0.9 pnpm dev  (comma-separated)
  allowedDevOrigins: (process.env.ALLOWED_DEV_ORIGINS ?? "")
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean),
  experimental: {
    agentUpgrade: "security",
  },
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
