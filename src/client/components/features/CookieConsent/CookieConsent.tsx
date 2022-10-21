import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AnalyticsService } from '~/client/services/analytics.service';
import { CookieService } from '~/client/services/cookie.service';

export default function CookieConsent() {
  const router = useRouter();
  const tarteAuCitronServiceName = 'atinternet';
  const analyticsService = new AnalyticsService();

  useEffect(() => {

    CookieService.init();

    const cookieConsent = CookieService.getCookieConsent();

    if (cookieConsent !== undefined && cookieConsent !== false) {
      window.tarteaucitron.user.atLibUrl = '/scripts/smarttag.js';
      window.tarteaucitron.user.atMore = function () {
        analyticsService.sendPage(router.pathname);
      };
    }

    (window.tarteaucitron.job = window.tarteaucitron.job || []).push(tarteAuCitronServiceName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <script>
      tarteaucitron.user.atinternetSendData = sendData (true | false);
      tarteaucitron.user.atNoFallback = noFallback (false | true);
    </script>
  );
}
