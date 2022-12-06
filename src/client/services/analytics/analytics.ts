export interface AnalyticsService {
  sendPage(page: string): void
  sendClick(action: string): void
  getCookieConsent(service: string): boolean
}
