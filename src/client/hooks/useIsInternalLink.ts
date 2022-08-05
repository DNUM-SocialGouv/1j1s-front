import { useMemo } from 'react';

export function useIsInternalLink(link: string) {
  const INTERNAL_URL_PREFIX = '/';
  const isInternalLink = useMemo(function () {
    return link.startsWith(INTERNAL_URL_PREFIX);
  }, [link]);
  return isInternalLink;
}
