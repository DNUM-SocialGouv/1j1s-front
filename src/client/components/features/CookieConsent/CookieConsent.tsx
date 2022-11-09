import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AnalyticsService } from '~/client/services/analytics.service';
import { CookieService } from '~/client/services/cookie.service';

export default function CookieConsent() {
  const router = useRouter();
  const atInternet = 'atinternet';
  const googleTagManager = 'multiplegtag';
  const analyticsService = new AnalyticsService();

  useEffect(() => {
    CookieService.init();
  }, []);

  useEffect(function setAtInternetCookie() {
    const atInternetCookieConsent = CookieService.getCookieConsent(atInternet);

    if (atInternetCookieConsent !== undefined && atInternetCookieConsent !== false) {
      window.tarteaucitron.user.atLibUrl = '/scripts/smarttag.js';
      window.tarteaucitron.user.atMore = function () {
        analyticsService.sendPage(router.pathname);
      };
    }

    window.tarteaucitron.job = window.tarteaucitron.job || [];
    window.tarteaucitron.job.push(atInternet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(function setGoogleTagManagerCookie() {
    window.tarteaucitron.job = window.tarteaucitron.job || [];
    window.tarteaucitron.job.push(googleTagManager);
  }, [router.pathname]);

  return (
    <script>
      tarteaucitron.user.atinternetSendData = sendData (true | false);
      tarteaucitron.user.atNoFallback = noFallback (false | true);
    </script>
  );
}
