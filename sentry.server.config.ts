// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const DEFAULT_SENTRY_SERVER_ENVIRONMENT = 'local';
const SENTRY_ENVIRONMENTS_ENABLE_SEND_DATA = ['integration', 'production', 'review_app'];
const SENTRY_ENVIRONMENTS_ENABLE_DEBUG = ['local', 'review_app'];

const SEND_DATA = SENTRY_ENVIRONMENTS_ENABLE_SEND_DATA.includes(process.env.SENTRY_ENVIRONMENT!);
const DEBUG_DATA = SENTRY_ENVIRONMENTS_ENABLE_DEBUG.includes(process.env.SENTRY_ENVIRONMENT!);

const releaseName = () => {
  if(process.env.SENTRY_ENVIRONMENT === 'review_app') {
    return 'reviewApp';
  }
  return `${process.env.npm_package_name}@${process.env.npm_package_version}`;
};
const userAgentBlacklist = process.env.SENTRY_USER_AGENT_BLACKLIST?.split(',');

Sentry.init({
  beforeSend(event) {
    if (!event.request?.headers) {
      return event;
    }
    const userAgent: string | undefined = event.request.headers['user-agent'];
    const userAgentDuBot = userAgentBlacklist?.find((botUserAgent) => userAgent?.includes(botUserAgent));
    if (userAgentDuBot !== undefined) {
      return null; // Don't send this event to Sentry
    }
    return event;
  },
  debug: DEBUG_DATA,
  dsn: process.env.SENTRY_DSN,
  enabled: SEND_DATA,// vérifier
  environment: process.env.SENTRY_ENVIRONMENT || DEFAULT_SENTRY_SERVER_ENVIRONMENT,
  release: releaseName(),
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE),
});

Sentry.configureScope((scope) => {
  scope.setLevel(process.env.SENTRY_LOG_LEVEL);
});
