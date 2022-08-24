import { useEffect, useMemo, useState } from 'react';

export function useIsInternalLink(href: string) {
  const [isInternal, setIsInternal] = useState(false);
  const INTERNAL_URL_PREFIX = '/';
  useEffect(() => {
    const INTERNAL_URL = window.location.origin;
    setIsInternal(href.startsWith(INTERNAL_URL));
  }, [href]);
  const isInternalLink = useMemo(function () {
    return href.startsWith(INTERNAL_URL_PREFIX);
  }, [href]);
  return isInternalLink || isInternal;
}
