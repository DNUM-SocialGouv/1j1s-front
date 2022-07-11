import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.css';

interface ButtonLinkProps extends React.AnchorHTMLAttributes<unknown> {
  label: string
  icon?: React.ReactNode
  dataTestId?: string
}

export function ButtonLink({ label, icon, dataTestId, ...rest } : ButtonLinkProps) {
  return (
    <Link data-testid={dataTestId} href={rest.href ? rest.href : ''}>
      <a className={styles.button} data-testid={dataTestId} {...rest}>
        <span className={styles.buttonLabel}>{label}</span>
        {icon && icon }
      </a>
    </Link>
  );
}
