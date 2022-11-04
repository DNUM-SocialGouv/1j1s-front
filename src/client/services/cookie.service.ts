/* eslint-disable */
export class CookieService {

  static init() {
    window.tarteaucitron.init({
      "privacyUrl": "/confidentialite", /* Privacy policy url */
      "bodyPosition": "bottom", /* or top to bring it as first element for accessibility */

      "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
      "cookieName": "tarteaucitron", /* Cookie name */

      "orientation": "middle", /* Banner position (top - bottom) */

      "groupServices": false, /* Group services by category */
      "serviceDefaultState": "wait", /* Default state (true - wait - false) */

      "showAlertSmall": false, /* Show the small banner on bottom right */
      "cookieslist": true, /* Show the cookie list */

      "closePopup": false, /* Show a close X on the banner */

      "showIcon": true, /* Show cookie icon to manage cookies */
      //"iconSrc": "", /* Optionnal: URL or base64 encoded image */
      "iconPosition": "BottomRight", /* BottomRight, BottomLeft, TopRight and TopLeft */

      "adblocker": false, /* Show a Warning if an adblocker is detected */

      "DenyAllCta" : true, /* Show the deny all button */
      "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
      "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */

      "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

      "removeCredit": false, /* Remove credit link */
      "moreInfoLink": true, /* Show more info link */

      "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
      "useExternalJs": false, /* If false, the tarteaucitron.js file will be loaded */

      //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for multisite */

      "readmoreLink": "/confidentialite", /* Change the default readmore link */

      "mandatory": true, /* Show a message about mandatory cookies */
      "mandatoryCta": true /* Show the disabled accept button when mandatory on */
    });
  }

  static getCookieConsent() {
    return window.tarteaucitron.proTemp?.split('!')
    ?.reduce((acc: Record<string, unknown>, entry: string) => {
      const [key, value]: string[] = entry.split('=');
      return { ...acc, [key]: value !== 'false' };
    }, {})?.['atinternet'];
  }
}