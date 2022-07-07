import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.css';

interface ButtonProps {
  label: string
  type?: 'submit' | 'button' | 'reset' | undefined
  icon?: React.ReactNode
  idForTest?: string
}

export function Button({ label, icon, type = 'button', idForTest } : ButtonProps) {
  return (
    <button className={styles.button} type={type} data-testid={idForTest}>
      <span className={styles.buttonLabel}>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
}
