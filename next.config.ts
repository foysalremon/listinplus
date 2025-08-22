import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", 
        hostname: "localhost", 
        port: "",
        pathname: '/portfolio/wordpress/listinger/wp-content/uploads/**',
      },
      // {
      //   protocol: "https", 
      //   hostname: "foysalremon.me", 
      //   port: "",
      //   pathname: '/wordpress/theme/listinger/wp-content/uploads/**',
      // },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
