import React from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNavDesktop } from '~/client/components/layouts/Header/HeaderNavDesktop';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function Header() {
  const { isLargeScreen } = useBreakpoint();

  return (
    <header
      className={styles.header}
      role="banner">
      { !isLargeScreen &&
        <Link href="https://solidarites-sante.gouv.fr/metiers-et-concours/metiers-soin-et-accompagnement/metiersdusoin" className={styles.headerBannerMobile}>
          <div className={styles.headerBannerMobileTitle}>Des métiers qui recrutent !</div>
          <Icon className={styles.headerBannerMobileIcon} name='angle-right' />
        </Link>
      }
      <HeaderBody />
      { isLargeScreen && <HeaderNavDesktop />}
    </header>
  );
}
