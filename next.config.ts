import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const nextConfig: NextConfig = {
  // React Compiler is stable in Next.js 16
  // reactCompiler: true,

  // Turbopack is the default bundler in Next.js 16
  // (enabled via --turbopack flag in dev, default in build)
}

export default nextConfig

initOpenNextCloudflareForDev()
