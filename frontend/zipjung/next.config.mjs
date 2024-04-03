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
          {
            protocol: 'https',
            hostname: 'zipzoong-bucket.s3.ap-northeast-2.amazonaws.com',
          },
        ],
      },
};

export default nextConfig;
