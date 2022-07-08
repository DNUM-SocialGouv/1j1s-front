import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<unknown> {
  icon?: React.ReactNode
  iconPosition?: 'right' | 'left'
  idForTest?: string
  disableStyle?: boolean
}

export function Button({ children, icon, iconPosition = 'right', idForTest, disableStyle = false, ...rest } : React.PropsWithChildren<ButtonProps>) {
  return (
    <button className={disableStyle ? styles.unbutton : styles.button} data-testid={idForTest} {...rest}>
      {
        iconPosition === 'right' ?
          <>
            <span className={styles.buttonLabelAtRight}>{children}</span>
            {icon && <span>{icon}</span>}
          </>
          :
          <>
            {icon && <span>{icon}</span>}
            <span className={styles.buttonLabelAtLeft}>{children}</span>
          </>
      }

    </button>
  );
}
