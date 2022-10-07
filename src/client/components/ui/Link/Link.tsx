import classNames from 'classnames';
import LinkNext from 'next/link';
import React, { useMemo } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

import styles from './Link.module.scss';

interface LinkProps extends React.AnchorHTMLAttributes<unknown> {
  appearance?: 'default' | 'asPrimaryButton' | 'asSecondaryButton'
  href: string
  prefetch?: boolean
}

export function Link({ appearance = 'default', className, children, href, prefetch = false, ...rest }: LinkProps & React.HTMLAttributes<HTMLLinkElement>) {
  const isInternalLink = useIsInternalLink(href);
  const hasIcon = useMemo(() => appearance !== 'default', [appearance]);
  const appearanceClass = useMemo(() => {
    switch (appearance) {
      case 'asPrimaryButton': return styles.primaryButton;
      case 'asSecondaryButton': return styles.secondaryButton;
      default: return styles.link;
    }
  }, [appearance]);

  return isInternalLink ? (
    <LinkNext href={href} prefetch={prefetch}>
      <a className={classNames(className, appearanceClass)} {...rest}>
        {children}
        {hasIcon && <Icon name='arrow-right' />}
      </a>
    </LinkNext>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={classNames(className, appearanceClass)} {...rest}>
      {children}
      {hasIcon && <Icon name='external-redirection' />}
    </a>
  );
}
