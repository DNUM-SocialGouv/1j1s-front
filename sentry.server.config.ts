// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  enabled: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'integration',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'integration',
  // Adjust this value in production, or use tracesSampler for greater control
  release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
