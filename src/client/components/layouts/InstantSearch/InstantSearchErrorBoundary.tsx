import React from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

import ErrorUnavailableService from '~/client/components/layouts/Error/ErrorUnavailableService';

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export const InstantSearchErrorBoundary = (props: React.PropsWithChildren<ErrorBoundaryProps>) => {
  const { error } = useInstantSearch({ catchError: true });
  const { children } = props;

  if (error) return <ErrorUnavailableService />;

  return <>{ children }</>;
};
