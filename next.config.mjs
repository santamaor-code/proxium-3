/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add remote clinic / CMS image hosts here as they're introduced
    remotePatterns: [],
  },
};

export default nextConfig;
