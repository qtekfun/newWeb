import type {NextConfig} from 'next';

const repo = 'newWeb';
const basePath = `/${repo}`;

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
