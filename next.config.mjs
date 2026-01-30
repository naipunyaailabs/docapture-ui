/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configure for static export
  output: 'export',
  trailingSlash: true,
  // Removed exportPathMap as it's not compatible with App Router
  // We'll handle static generation differently
}

export default nextConfig