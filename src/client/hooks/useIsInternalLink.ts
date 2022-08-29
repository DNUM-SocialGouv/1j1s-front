import { useMemo } from 'react';

export function useIsInternalLink(href: string) {
  const getUrlProd = process.env['FRONT_URL'] ? process.env['FRONT_URL'] : '/';
  const INTERNAL_URL_PREFIX = '/';
  const INTERNAL_URL_PROD = getUrlProd.toString();
  const isInternalLink = useMemo(function () {
    const isInternalProd = href.startsWith(INTERNAL_URL_PROD);
    const isInternalPrefix = href.startsWith(INTERNAL_URL_PREFIX);
    return isInternalPrefix || isInternalProd;
  }, [href, INTERNAL_URL_PROD]);
  return isInternalLink;
}
