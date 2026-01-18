/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // 3.0 to enable cache components write the following line and after doing that it will show error. The previous mental model was try to make everything static as possible.
  cacheComponents: true,
};

export default nextConfig;
