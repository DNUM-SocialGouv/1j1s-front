import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.css';
import { ButtonProps } from '~/client/components/ui/Button/buttonprops.type';

export function ButtonPrimary({ children, icon, iconPosition = 'right', idForTest, disableStyle = false, ...rest } : React.PropsWithChildren<ButtonProps>) {
  return (
    <button className={disableStyle ? styles.unbutton : styles.buttonPrimary} data-testid={idForTest} {...rest}>
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
