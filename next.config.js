const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  // experimental: {
  //   optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  // },
  env: {
    NEXT_AUTH: "RHa9HoetYfQRjE+L2/Y1X9+oAaAL/0lymqx/W3Oe/HI=",
  },
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
    devIndicators:false,

  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|json)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
      {
        // Apply these headers to all routes in application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
