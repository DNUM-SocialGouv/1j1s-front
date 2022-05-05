import React from 'react';

import styles from '~/client/components/ui/Hero/Hero.module.css';

export function Hero({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className={styles.hero} {...rest}>
      { children }
    </div>
  );
}
