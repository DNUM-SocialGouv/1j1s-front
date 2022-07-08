import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.css';

interface ButtonLinkProps extends React.AnchorHTMLAttributes<unknown> {
  label: string
  icon?: React.ReactNode
  idForTest: string
}

export function ButtonLink({ label, icon, idForTest, ...rest } : ButtonLinkProps) {
  return (
    <Link data-testid={idForTest} href={rest.href ? rest.href : ''}>
      <a className={styles.button}  data-testid={idForTest} {...rest}>
        <span className={styles.buttonLabel}>{label}</span>
        {icon && icon }
      </a>
    </Link>
  );
}
