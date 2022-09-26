import React from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNav } from '~/client/components/layouts/Header/HeaderNav';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function Header() {
  const { isLargeScreen } = useBreakpoint();

  return (
    <header
      className={styles.header}
      role="banner">
      <HeaderBody />
      { isLargeScreen && <HeaderNav />}
    </header>
  );
}
