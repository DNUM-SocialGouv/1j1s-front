import * as Sentry from '@sentry/nextjs';
import { SeverityLevel } from '@sentry/nextjs';

const DEFAULT_SENTRY_ENVIRONMENT = 'local';
const USER_AGENT_BLACKLIST = process.env.NEXT_PUBLIC_SENTRY_USER_AGENT_BLACKLIST?.split(',');
const SENTRY_ENVIRONMENTS_ENABLE_SEND_DATA = ['integration', 'production', 'review_app'];
const SENTRY_ENVIRONMENTS_ENABLE_DEBUG = ['local', 'review_app'];
const SEND_DATA = SENTRY_ENVIRONMENTS_ENABLE_SEND_DATA.includes(process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || '');
const DEBUG_DATA = SENTRY_ENVIRONMENTS_ENABLE_DEBUG.includes(process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || '');


const releaseName = (environnement = process.env) => {
  if(environnement.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'review_app') {
    return 'reviewApp';
  }
  return `${environnement.npm_package_name}@${environnement.npm_package_version}`;
};

process.env.NODE_ENV === 'production' && Sentry.init({
  beforeSend(event) {
    if(!SEND_DATA) {
      return null;
    }
    if (!event.request?.headers) {
      return event;
    }
    const userAgent: string | undefined = event.request.headers['user-agent'];
    const userAgentDuBot = USER_AGENT_BLACKLIST?.find((botUserAgent) => userAgent?.includes(botUserAgent));
    if (userAgentDuBot !== undefined) {
      return null; // Don't send this event to Sentry
    }
    return event;
  },
  debug: DEBUG_DATA,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: true,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || DEFAULT_SENTRY_ENVIRONMENT,
  initialScope: {
    level: process.env.NEXT_PUBLIC_SENTRY_LOG_LEVEL as SeverityLevel,
  },
  release: releaseName(),
  tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE),
});
