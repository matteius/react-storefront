// const { withSentryConfig } = require("@sentry/nextjs");
/* eslint @typescript-eslint/no-var-requires: "off" */
const { withImageLoader } = require("next-image-loader");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "@saleor/checkout-storefront",
  "checkout-common",
]);

const isSentryEnabled = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const imageConversionFormats = process.env.NEXT_PUBLIC_IMAGE_CONVERSION_FORMATS
  ? process.env.NEXT_PUBLIC_IMAGE_CONVERSION_FORMATS.split(",")
  : [];

const checkoutEmbededInStorefrontPath = "/";

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  i18n: {
    locales: ["en-US", "pl-PL", "fr-FR", "vi-VN", "ar-AE"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["cdn.mattscoinage.com"],
    formats: imageConversionFormats,
    // loaderFile: './image-loader.js',
    // loader: 'custom',
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/channels/",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
      // required for when Checkout is proxied via the Storefront
      {
        source: `${checkoutEmbededInStorefrontPath}/_next/:path*`,
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // required for when Checkout is proxied via the Storefront
        {
          source: `${checkoutEmbededInStorefrontPath}/:path*`,
          destination: `/:path*`,
        },
      ],
    };
  },
  images: { domains: ["localhost"] },
  experimental: {
    // https://nextjs.org/docs/messages/import-esm-externals
    esmExternals: "loose",
    externalDir: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  assetPrefix: `${checkoutEmbededInStorefrontPath}`,
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: false,
  },
};

const nextPlugins = [
  (config) => withImageLoader(config),
  (config) => withTM(config),
  //(config) => withSentryConfig(config),
  //(config) => withBundleAnalyzer(config),
  //(config) => withSentryConfig(config, sentryWebpackPluginOptions),
];

module.exports = withPlugins(nextPlugins, nextConfig);
