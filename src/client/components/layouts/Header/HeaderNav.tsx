import { useRouter } from 'next/router';
import React, {
  useEffect,
  useState,
} from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { NavigationItem,navigationItemList } from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { NavItemWithSubItems } from '~/client/components/layouts/Header/NavItemWithSubItems';

export function HeaderNav() {
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
          {buildNavigation(navigationItemList, 0, path)}
        </ul>
      </nav>
    </Container>
  );
}

export function buildNavigation(navigationItemList: NavigationItem[], nestingLevel: number, path: string) {
  return navigationItemList.map((item, index) => {
    if ('children' in item && item.children.length > 0) {
      return (
        <NavItemWithSubItems key={index} label={item.label} className={styles.navItem} path={path} subItemList={item.children}>
          {buildNavigation(item.children, nestingLevel + 1, path)}
        </NavItemWithSubItems>
      );
    } else if ('link' in item) {
      return <NavItem label={item.label} link={item.link} key={index} className={nestingLevel > 0 ? styles.subNavItem : styles.navItem} path={path}/>;
    }
  });
}
