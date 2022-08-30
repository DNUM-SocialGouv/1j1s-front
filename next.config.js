// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { URL } = require('url');

function getHostName(uri) {
  return new URL(uri).hostname;
}

const CMS_HOST = getHostName(process.env.STRAPI_URL_API);
const API_POLE_EMPLOI_HOST = getHostName(process.env.POLE_EMPLOI_CONNECT_URL);
const STRAPI_MEDIA_URL = getHostName(process.env.STRAPI_MEDIA_URL);
const BUCKET_S3_URL = process.env.BUCKET_S3_URL;

const moduleExports = {
  compress: true,
  env: {
    FRONT_URL: process.env.FRONT_URL,
  },
  images: {
    domains: [CMS_HOST, API_POLE_EMPLOI_HOST, BUCKET_S3_URL, STRAPI_MEDIA_URL],
  },
  optimization: {
    mergeDuplicateChunks: true,
  },
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        '@sentry': {
          name: '@sentry',
          priority: 10,
          reuseExistingChunk: false,
          test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
        },
      };
    }

    return config;
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
