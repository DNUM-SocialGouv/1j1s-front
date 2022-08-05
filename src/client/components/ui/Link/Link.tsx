import LinkNext from 'next/link';
import React from 'react';

import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';


interface LinkProps extends React.AnchorHTMLAttributes<unknown> {
  link: string
}

export function Link({ children, link, ...rest }: React.PropsWithChildren<LinkProps>) {
  const isInternalLink = useIsInternalLink(link);

  return (
    <>
      { isInternalLink
        ? <LinkNext href={link}>
          <a {...rest}>
            {children}
          </a>
        </LinkNext>
        : <a href={link} target='_blank' rel='noreferrer' {...rest}>
          {children}
        </a>
      }
    </>
  );
}
