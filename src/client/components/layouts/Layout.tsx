import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

import { Header } from '~/client/components/layouts/Header/Header';
import Bouée from '~/client/components/ui/Bouée/Bouée';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analytics/analytics';

const Footer = dynamic(() => import(/* webpackChunkName: 'footer' */ '~/client/components/layouts/Footer/Footer'), { ssr: false });
const SkipLink = dynamic(() => import(/* webpackChunkName: 'header' */ '~/client/components/ui/SkipLink/SkipLink'), { ssr: false });

export function Layout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const analyticsService = useDependency<AnalyticsService>('analyticsService');
  const surface = useRef<HTMLDivElement>(null);

  useEffect(() => {
    analyticsService.sendPage(router.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <div ref={ surface }>
      <SkipLink/>
      <Header/>
      {children}
      <Footer/>
      <Bouée surface={ surface } />
    </div>
  );
}
