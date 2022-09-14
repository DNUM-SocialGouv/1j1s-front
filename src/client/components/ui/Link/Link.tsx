import LinkNext from 'next/link';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useMemo } from 'react';

import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

interface LinkProps extends React.AnchorHTMLAttributes<unknown> {
  href: string
  prefetch?: boolean
}

export function Link({ children, href, prefetch, ...rest }: React.PropsWithChildren<LinkProps>) {
  const isInternalLink = useIsInternalLink(href);
  const router = useRouter();

  const computedLienRetour: string = useMemo(() => {
    return `${href}?from=${router.route}&params=${encodeURIComponent(stringify(router.query))}`;
  }, [href, router]);

  return isInternalLink ? (
    <LinkNext href={computedLienRetour} as={href} prefetch={prefetch ? prefetch : true}>
      <a {...rest}>
        {children}
      </a>
    </LinkNext>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}
