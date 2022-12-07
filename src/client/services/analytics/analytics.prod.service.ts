/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AnalyticsService } from '~/client/services/analytics/analytics';

declare global {
  interface Window {
    ATInternet: any
    tarteaucitron: any
  }
}

const IS_COOKIE_CONSENT_NEEDED = false;

export class AnalyticsProdService implements AnalyticsService {
  private tag;

  constructor() {
    this.tag = this.initTagTracker();
    IS_COOKIE_CONSENT_NEEDED && this.initCookieConsent();
  }

  private initTagTracker() {
    try {
      return new window.ATInternet.Tracker.Tag();
    } catch(e) {
      return {
        click: { send: () => ({}) },
        dispatch: () => ({}),
        page: { set: () => ({}) },
      };
    }
  }

  private initCookieConsent() {
    /**
     * adblocker: Show a Warning if an adblocker is detected (true - false)
     * AcceptAllCta: Show the accept all button when highPrivacy on (true - false)
     * bodyPosition: bottom, or top to bring it as first element for accessibility
     * cookieName: Cookie name…
     * closePopup: Show a close X on the banner (true - false)
     * cookieDomain: Shared cookie for multisite (.my-multisite-domaine.fr)
     * cookieslist: Show the cookie list (true - false)
     * DenyAllCta: Show the deny all button (true - false)
     * groupServices: Group services by category (true - false)
     * handleBrowserDNTRequest: If Do Not Track == 1, disallow all (true - false)
     * hashtag: Open the panel with this hashtag
     * highPrivacy: HIGHLY RECOMMANDED Disable auto consent (true - false)
     * iconPosition: Icon position… (BottomLeft - BottomRight - BottomLeft - TopRight - TopLeft)
     * iconSrc: URL or base64 encoded image (optional)
     * mandatory: Show a message about mandatory cookies
     * mandatoryCta: Show the disabled accept button when mandatory on
     * moreInfoLink: Show more info link (true - false)
     * orientation: Banner position (top - middle - bottom)
     * privacyUrl: Privacy policy url
     * readmoreLink: Change the default readmore link ("/confidentialite")
     * removeCredit: Remove credit link (true - false)
     * serviceDefaultState Default state (true - wait - false)
     * showAlertSmall: Show the small banner on bottom right (true - false)
     * showIcon: Show cookie icon to manage cookies (true - false)
     * useExternalCss: If false, the tarteaucitron.css file will be loaded
     * useExternalJs: If false, the tarteaucitron.js file will be loaded
     * */

    window.tarteaucitron.init({
      AcceptAllCta : true,
      DenyAllCta : true,
      adblocker: false,
      bodyPosition: 'bottom',
      closePopup: false,
      cookieName: 'tarteaucitron',
      cookieslist: true,
      groupServices: false,
      handleBrowserDNTRequest: false,
      hashtag: '#tarteaucitron',
      highPrivacy: true,
      iconPosition: 'BottomLeft',
      mandatory: true,
      mandatoryCta: true,
      moreInfoLink: true,
      orientation: 'middle',
      privacyUrl: '/confidentialite',
      readmoreLink: '/confidentialite',
      removeCredit: false,
      serviceDefaultState: 'wait',
      showAlertSmall: false,
      showIcon: true,
      useExternalCss: false,
      useExternalJs: false,
    });
  }

  //@param info: {name: string, level2?: string, chapter1?: string, chapter2?: string, chapter3?: string, customObject?: any}
  sendPage(name: string): void {
    this.tag.page.set({ name });
    this.tag.dispatch();
  }

  //@param info: {elem: any, name: string, level2?: string, chapter1?: string, chapter2?: string, chapter3?: string, type: string, customObject?: any}
  sendClick(action: string): void {
    this.tag.click.send({ name: action });
  }

  getCookieConsent(service: string): boolean {
    return window.tarteaucitron.proTemp?.split('!')
      ?.reduce((acc: Record<string, unknown>, entry: string) => {
        const [key, value]: string[] = entry.split('=');
        return { ...acc, [key]: value !== 'false' };
      }, {})?.[service];
  }
}
