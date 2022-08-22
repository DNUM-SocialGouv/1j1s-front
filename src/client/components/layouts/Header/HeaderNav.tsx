import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { CommonProps } from '~/client/components/props';

export function HeaderNav({ children }: React.PropsWithChildren<CommonProps>){
  return(
    <div className={styles.headerNavigationContainer}>
      <Container className={styles.headerNavigation}>
        <nav
          id="header-navigation"
          role="navigation"
          aria-label="Menu principal"
        >
          {children && (
            <ul className={styles.headerNavigationList}>
              {children}
            </ul>
          )}
        </nav>
      </Container>
    </div>
  );
}
