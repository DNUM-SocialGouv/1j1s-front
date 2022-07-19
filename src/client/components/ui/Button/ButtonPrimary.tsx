import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/Button/Button.module.scss';
import { ButtonProps } from '~/client/components/ui/Button/button.props';

export function ButtonPrimary({ children, icon, iconPosition = 'right', dataTestId, isInvertedStyle = false, ...rest } : React.PropsWithChildren<ButtonProps>) {
  return (
    <button className={classNames([styles.button], { [styles.buttonLink]: isInvertedStyle, [styles.buttonPrimary]: !isInvertedStyle })} data-testid={dataTestId} {...rest}>
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
