import { useEffect, useMemo, useState } from 'react';

const PATHNAME_PREFIX = '/';

export function useIsInternalLink(href: string) {
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return useMemo(function () {
    return href.startsWith(origin) || href.startsWith(PATHNAME_PREFIX);
  }, [href, origin]);
}
