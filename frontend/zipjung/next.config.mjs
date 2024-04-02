/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.danawa.com',
          },
        ],
      },
};

export default nextConfig;
