import { useMemo } from 'react';

export function useIsInternalLink(href: string) {
  const INTERNAL_URL_PREFIX = '/';
  const isInternalLink = useMemo(function () {
    return href.startsWith(INTERNAL_URL_PREFIX);
  }, [href]);
  return isInternalLink;
}
