import LinkNext from 'next/link';
import React from 'react';

import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';


interface LinkProps extends React.AnchorHTMLAttributes<unknown> {
  href: string
}

export function Link({ children, href, ...rest }: React.PropsWithChildren<LinkProps>) {
  const isInternalLink = useIsInternalLink(href);

  return isInternalLink ? (
    <LinkNext href={href}>
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
