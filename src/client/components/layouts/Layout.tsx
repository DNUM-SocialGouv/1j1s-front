import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Header } from '~/client/components/layouts/Header/Header';
import Bouée from '~/client/components/ui/Bouée/Bouée';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analyticsService';

const Footer = dynamic(() => import(/* webpackChunkName: 'footer' */ '~/client/components/layouts/Footer/Footer'), { ssr: false });
const SkipLink = dynamic(() => import(/* webpackChunkName: 'header' */ '~/client/components/ui/SkipLink/SkipLink'), { ssr: false });

export function Layout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const analyticsService = useDependency<AnalyticsService>('analyticsService');
  const [isLoading, setIsLoading] = useState(false);
  const surface = useRef<HTMLElement>(null);


  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    analyticsService.sendPage(router.pathname);
  }, [router.pathname, analyticsService]);
  return (
    <main ref={ surface }>
      <SkipLink/>
      {isLoading && <Header/>}
      {children}
      <Footer/>
      <Bouée surface={ surface } />
    </main>
  );
}
