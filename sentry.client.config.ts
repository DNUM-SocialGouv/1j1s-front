// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const DEFAULT_SENTRY_CLIENT_ENVIRONMENT = 'local';

const userAgentBlacklist = process.env.NEXT_PUBLIC_SENTRY_USER_AGENT_BLACKLIST?.split(' ');

Sentry.init({
  beforeSend(event) {
    if(!event.request?.headers) {
      return event;
    }
    const userAgent: string | undefined = event.request.headers['user-agent'];
    const userAgentDuBot = userAgentBlacklist?.find((botUserAgent) => userAgent?.includes(botUserAgent));
    if (userAgentDuBot !== undefined) {
      return null; // Don't send this event to Sentry
    }
    return event;
  },
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'production' || process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'integration',
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || DEFAULT_SENTRY_CLIENT_ENVIRONMENT,
  release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
  tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE),
});
