/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "protocol", value: "http" }],
        permanent: true,
        destination: "https://true-view-frontend.vercel.app/:path*",
      },
    ];
  },
};


export default nextConfig;
