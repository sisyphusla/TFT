/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./app/styles'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
