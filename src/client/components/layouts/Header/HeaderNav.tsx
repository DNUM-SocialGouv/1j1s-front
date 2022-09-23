import { useRouter } from 'next/router';
import React, {
  useEffect,
  useState,
} from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { navigationItemList } from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { NavItemWithSubItems } from '~/client/components/layouts/Header/NavItemWithSubItems';

export function HeaderNav() {
  const {
    accueil,
    accompagnementNav,
    employeurNav,
    engagementNav,
    offresNav,
    orientationNav,
  } = navigationItemList;
  const router = useRouter();
  const [path, setPath] = useState(() => router.pathname || '');

  useEffect(() => {
    if (path !== router.pathname){
      setPath(router.pathname);
    }
  }, [path, setPath, router]);

  return (
    <Container className={styles.headerNavigation}>
      <nav id="header-navigation"
        role="navigation"
        aria-label="Menu principal">
        <ul className={styles.headerNavigationList}>
          <NavItem className={styles.navItem} label={accueil.label} link={accueil.link} isActive={path === accueil.link} />
          <NavItemWithSubItems className={styles.navItem} label={offresNav.label} path={path} subItemList={offresNav.children} />
          <NavItemWithSubItems className={styles.navItem} label={orientationNav.label} path={path} subItemList={orientationNav.children} />
          <NavItemWithSubItems className={styles.navItem} label={accompagnementNav.label} path={path} subItemList={accompagnementNav.children} />
          <NavItemWithSubItems className={styles.navItem} label={engagementNav.label} path={path} subItemList={engagementNav.children} />
          <div aria-hidden={true} className={styles.navItemSeparator} />
          <NavItemWithSubItems className={styles.navItem} label={employeurNav.label} path={path} subItemList={employeurNav.children} />
        </ul>
      </nav>
    </Container>
  );
}
