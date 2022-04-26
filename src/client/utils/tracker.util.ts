import { init, push } from '@socialgouv/matomo-next';

enum TRACK_CATEGORY {
  TRACK_EVENT = 'trackEvent',
}

enum TRACK_EVENT {
  CLICK = 'click',
}

class MatomoInitException extends Error {
  constructor(siteId: string | undefined, url: string | undefined) {
    super(`Cannot init Matomo with site id ${siteId} and url ${url}`);
    this.name = 'MatomoInitException';
  }
}

export function initTracker() {
  const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
  const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

  if (!MATOMO_SITE_ID || !MATOMO_URL) {
    throw new MatomoInitException(MATOMO_SITE_ID, MATOMO_URL);
  }

  init({
    siteId: MATOMO_SITE_ID,
    url: MATOMO_URL,
  });
}

export function trackClick(action: string): void {
  push([TRACK_CATEGORY.TRACK_EVENT, TRACK_EVENT.CLICK, action]);
}
