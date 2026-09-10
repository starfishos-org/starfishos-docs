import type { NextConfig } from 'next';

const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/starfishos-docs' : '';

const nextConfig: NextConfig = {
  agentRules: false,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
