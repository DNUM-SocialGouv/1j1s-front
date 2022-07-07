import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.css';

interface ButtonWithoutBorderProps {
  label: string
  icon?: React.ReactNode
  idForTest: string
}

export function ButtonWithoutBorder({ label, icon, idForTest } : ButtonWithoutBorderProps) {
  return (
    <div className={styles.buttonWithoutBorder} data-testid={idForTest}>
      {icon && <span>{icon}</span>}
      <span className={styles.buttonLabel}>{label}</span>
    </div>
  );
}
