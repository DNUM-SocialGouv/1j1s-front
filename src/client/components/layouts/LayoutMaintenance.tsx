import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import SkipLink from '~/client/components/ui/SkipLink/SkipLink';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analyticsService';

export function LayoutMaintenance({ children }: React.PropsWithChildren) {

  const router = useRouter();
  const analyticsService = useDependency<AnalyticsService>('analyticsService');

  useEffect(() => {
    analyticsService.sendPage(router.pathname);
  }, [router.pathname, analyticsService]);
  
  return (
    <>
      <SkipLink />
      {children}
    </>
  );
}
