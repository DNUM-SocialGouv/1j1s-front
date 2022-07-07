import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.css';

interface ButtonAsLinkProps {
  label: string
  href?: string
  target?: string
  icon?: React.ReactNode
  idForTest: string
}

export function ButtonLink({ label, href, target = '', icon, idForTest } : ButtonAsLinkProps) {
  return (
    <Link data-testid={idForTest} href={href || ''}>
      <a className={styles.button} target={target} data-testid={idForTest}>
        <span className={styles.buttonLabel}>{label}</span>
        {icon && icon }
      </a>
    </Link>
  );
}
