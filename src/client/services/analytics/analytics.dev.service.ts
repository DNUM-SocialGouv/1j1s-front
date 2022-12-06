/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AnalyticsService } from '~/client/services/analytics/analytics';

interface Tag {
  event: 'page' | 'click'
  name: string
}

declare global {
  interface Window {
    tags: Tag[]
  }
}

export class AnalyticsDevService implements AnalyticsService {
  constructor() {
    window.tags = [];
  }

  sendPage(name: string) {
    window.tags.push({
      event: 'page',
      name,
    });
  }

  sendClick(action: string) {
    window.tags.push({
      event: 'click',
      name: action,
    });
  }

  getCookieConsent(service: string): boolean {
    return service === service;
  }
}
