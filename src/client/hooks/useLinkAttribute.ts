import { useMemo } from 'react';

export function useLinkAttribute(link: string) {
  const INTERNAL_URL_PREFIX = '/';
  const isInternalLink = useMemo(function () {
    return link.startsWith(INTERNAL_URL_PREFIX);
  }, [link]);

  const externalAttributes = {
    rel: 'noreferrer',
    target: '_blank',
  };

  return {
    externalAttributes,
    isInternalLink,
  };
}
