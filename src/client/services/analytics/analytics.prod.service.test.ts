/**
 * @jest-environment jsdom
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AnalyticsProdService } from '~/client/services/analytics/analytics.prod.service';

describe('AnalyticsProdService', () => {
  const pageSetSpy = jest.fn();
  const clickSendSpy = jest.fn();
  const dispatchSpy = jest.fn();
  const initSpy = jest.fn();
  const tagSpy = jest.fn().mockReturnValue({
    click: { send: clickSendSpy },
    dispatch: dispatchSpy,
    page: { set: pageSetSpy },
  });

  beforeEach(() => {
    (global as any).tarteaucitron = {
      init: initSpy,
      job: [],
    };
    (global as any).ATInternet = {
      Tracker : {
        Tag: tagSpy,
      },
    };
  });

  afterEach(() => {
    pageSetSpy.mockRestore();
    clickSendSpy.mockRestore();
    dispatchSpy.mockRestore();
    initSpy.mockRestore();
  });

  it('initialise le consentement des cookies et le tracker', () => {
    const expectedCookiesSettings = {
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
    };

    new AnalyticsProdService();

    expect(tagSpy).toHaveBeenCalled();
    // Toggle test when cookie consent is needed
    expect(initSpy).not.toHaveBeenCalledWith(expectedCookiesSettings);
  });

  describe('sendPage', () => {
    it('envoie un événement page au tracking', () => {
      const page = '/emplois';

      const analyticsService = new AnalyticsProdService();
      analyticsService.sendPage(page);

      expect(pageSetSpy).toHaveBeenCalledWith({ name: page });
    });
  });

  describe('sendClick', () => {
    it('envoie un événement click au tracking', () => {
      const action = 'click';

      const analyticsService = new AnalyticsProdService();
      analyticsService.sendClick(action);

      expect(clickSendSpy).toHaveBeenCalledWith({ name: action });
    });
  });
});
