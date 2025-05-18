import type { NextConfig } from 'next'
import Critters from 'critters-webpack-plugin'

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  webpack(config, { isServer }) {
    // Only apply Critters on client builds (SSR doesn't need it)
    if (!isServer) {
      config.plugins.push(
        new Critters({
          // Optional settings — tweak these as needed
          preload: 'swap',
          pruneSource: true,
          compress: true,
        })
      )
    }

    return config
  },
}

export default nextConfig
