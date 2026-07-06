import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["leaflet"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rose-app.elevate-bootcamp.cloud",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.rose-app.elevate-bootcamp.cloud",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
