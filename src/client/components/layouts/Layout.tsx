import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, {
  useEffect,
  useState,
} from 'react';

import { Header } from '~/client/components/layouts/Header/Header';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analyticsService';

const Footer = dynamic(() => import(/* webpackChunkName: 'footer' */ '~/client/components/layouts/Footer/Footer'), { ssr: false });
const SkipLink = dynamic(() => import(/* webpackChunkName: 'header' */ '~/client/components/ui/SkipLink/SkipLink'), { ssr: false });

export function Layout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const analyticsService = useDependency<AnalyticsService>('analyticsService');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    analyticsService.sendPage(router.pathname);
  }, [router.pathname, analyticsService]);
  return (
    <>
      <SkipLink/>
      {isLoading && <Header/>}
      {children}
      <Footer/>
    </>
  );
}
