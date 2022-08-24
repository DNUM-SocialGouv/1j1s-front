import { useMemo } from 'react';

export function useIsInternalLink(href: string) {
  const INTERNAL_URL_PREFIX = '/';
  const INTERNAL_URL_PROD = 'https://1j1s-front.osc-fr1.scalingo.io/';
  const isInternalLink = useMemo(function () {
    const isInternalProd = href.startsWith(INTERNAL_URL_PROD);
    const isInternalPrefix = href.startsWith(INTERNAL_URL_PREFIX);
    return isInternalPrefix || isInternalProd;
  }, [href]);
  return isInternalLink;
}
