import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rose-app.elevate-bootcamp.cloud",
        pathname: "/storage/entities/**",
      },
      {
        protocol: "https",
        hostname: "placehold.net",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
