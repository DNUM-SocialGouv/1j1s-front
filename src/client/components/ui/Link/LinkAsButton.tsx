import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/ui/Link/LinkAsButton.module.scss';

interface LinkAsButtonProps extends React.AnchorHTMLAttributes<unknown> {
  label: string
  icon?: React.ReactNode
  dataTestId?: string
}

export function LinkAsButton({ label, icon, dataTestId, ...rest } : LinkAsButtonProps) {
  return (
    <Link data-testid={dataTestId} href={rest.href ? rest.href : ''}>
      <a className={classNames(styles.linkAsButton, styles.linkAsButtonPrimary)} data-testid={dataTestId} {...rest}>
        {label}
        {icon && icon }
      </a>
    </Link>
  );
}
