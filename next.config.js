/** @type {import('next').NextConfig} */
const nextConfig = {
  // add hostname for images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/*",
      },
    ],
  },
};

module.exports = nextConfig;
