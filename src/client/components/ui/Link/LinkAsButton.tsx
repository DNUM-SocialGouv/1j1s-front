import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/ui/Link/LinkAsButton.module.scss';

interface LinkAsButtonProps extends React.AnchorHTMLAttributes<unknown> {
  icon?: React.ReactNode
}

export function LinkAsButton({ children, icon, ...rest } : React.PropsWithChildren<LinkAsButtonProps>) {
  return (
    <Link href={rest.href ? rest.href : ''}>
      <a className={classNames(styles.linkAsButton, styles.linkAsButtonPrimary)} {...rest}>
        {children}
        {icon && icon }
      </a>
    </Link>
  );
}
