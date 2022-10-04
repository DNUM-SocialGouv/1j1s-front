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
const TRUSTED_SOURCES = '*.fabrique.social.gouv.fr https://ms-ed664c2b32fd-360.lon.meilisearch.io/indexes/offre-de-stage/search https://1j1s-stage-content-manager-prod.osc-fr1.scalingo.io/api/*';
const ANALYTICS_SOURCES = '*.xiti.com';

const contentSecurityPolicy = `
  default-src 'self' ${TRUSTED_SOURCES};
  script-src 'self' ${ANALYTICS_SOURCES};
  img-src 'self' data: ${BUCKET_S3_URL} ${STRAPI_MEDIA_URL} ${ANALYTICS_SOURCES};
  style-src 'self' 'unsafe-inline';
  frame-ancestors 'none';
  frame-src *.apprentissage.beta.gouv.fr immersion-facile.beta.gouv.fr deposer-offre.www.1jeune1solution.gouv.fr *.youtube.com;
  form-action 'self';
  base-uri 'none';
`;

const DEV_ENVIRONMENTS = ['development', 'local'];

async function headers() {
  if (DEV_ENVIRONMENTS.includes(process.env.NODE_ENV)) {
    return [];
  } else {
    return [{
      headers: [{
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      }, {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      }, {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      }, {
        key: 'Referrer-Policy',
        value: 'no-referrer, strict-origin-when-cross-origin',
      }, {
        key: 'Content-Security-Policy',
        value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
      }],
      source: '/:path*',
    }];
  }
}

const moduleExports = {
  compress: true,
  env: {
    npm_package_name: process.env.npm_package_name,
    npm_package_version: process.env.npm_package_version,
  },
  headers,
  images: {
    domains: [CMS_HOST, API_POLE_EMPLOI_HOST, BUCKET_S3_URL, STRAPI_MEDIA_URL],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.mergeDuplicateChunks = true;
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

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports);
