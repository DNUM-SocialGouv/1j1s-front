import LinkNext from 'next/link';
import React, {
  useEffect,
  useMemo,
} from 'react';


interface LinkProps extends React.AnchorHTMLAttributes<unknown> {
  link: string
  getLinkType: (value: boolean) => void
}

export function Link({ children, link, getLinkType, ...rest }: React.PropsWithChildren<LinkProps>) {
  const INTERNAL_URL_PREFIX = '/';
  const isInternalLink = useMemo(function () {
    return link.startsWith(INTERNAL_URL_PREFIX);
  }, [link]);

  useEffect(() => {
    getLinkType(isInternalLink);
  }, [getLinkType, isInternalLink]);

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
