/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vectorseek.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://pm3uf3zsxf.us-east-1.awsapprunner.com/:path*',
      },
    ];
  },
};

export default nextConfig;
