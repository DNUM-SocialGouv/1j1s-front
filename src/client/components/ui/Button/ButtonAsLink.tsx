import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.css';

interface ButtonAsLinkProps {
  label: string
  icon?: React.ReactNode
}

export function ButtonAsLink({ label, icon } : ButtonAsLinkProps) {
  return (
    <div className={styles.buttonAsLink}>
      {icon && <span>{icon}</span>}
      <span className={styles.buttonLabel}>{label}</span>
    </div>
  );
}
