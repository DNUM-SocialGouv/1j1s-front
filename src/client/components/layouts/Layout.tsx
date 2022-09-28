import { useRouter } from 'next/router';
import React, {
  useEffect,
  useState,
} from 'react';

import { Footer } from '~/client/components/layouts/Footer/Footer';
import { Header } from '~/client/components/layouts/Header/Header';
import { SkipLink } from '~/client/components/ui/SkipLink/SkipLink';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analyticsService';

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
