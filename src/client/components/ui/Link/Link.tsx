import LinkNext from 'next/link';
import React from 'react';

import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

interface LinkProps extends React.AnchorHTMLAttributes<unknown> {
  href: string
  prefetch?: boolean
  canGoBack?: boolean
}

export function Link({ children, href, prefetch, canGoBack = false, ...rest }: React.PropsWithChildren<LinkProps>) {
  const isInternalLink = useIsInternalLink(href);

  function handleClick() {
    if(canGoBack) {
      sessionStorage.setItem('isButtonBackVisible', 'true');
    }
  }

  return isInternalLink ? (
    <LinkNext href={href} prefetch={prefetch}>
      <a onClick={handleClick} {...rest}>
        {children}
      </a>
    </LinkNext>
  ) : (
    <a onClick={handleClick} href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}
