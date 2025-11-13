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
  trailingSlash: false,
  // Exclude auth pages from prerendering since they require client-side authentication
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/pricing': { page: '/pricing' },
      '/excel-demo': { page: '/excel-demo' },
      '/json-excel-demo': { page: '/json-excel-demo' },
      '/test-dynamic-ui': { page: '/test-dynamic-ui' },
      '/test-sse': { page: '/test-sse' },
      '/test-agui': { page: '/test-agui' },
      '/dashboard': { page: '/dashboard' },
      '/dashboard/services': { page: '/dashboard/services' },
      '/dashboard/history': { page: '/dashboard/history' },
      '/dashboard/analytics': { page: '/dashboard/analytics' },
      '/dashboard/profile': { page: '/dashboard/profile' },
      '/dashboard/subscription': { page: '/dashboard/subscription' },
      '/dashboard/integrations': { page: '/dashboard/integrations' },
      // Note: Auth pages are excluded from static export as they require client-side authentication
    }
  },
}

export default nextConfig