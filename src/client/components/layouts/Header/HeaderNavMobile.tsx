import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { navigationItemList } from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { NavItemWithSubItems } from '~/client/components/layouts/Header/NavItemWithSubItems';

export function HeaderNavMobile({ toggleModal }: { toggleModal: () => void, path: string }) {
  const {
    accueil,
    accompagnementNav,
    employeurNav,
    engagementNav,
    offresNav,
    orientationNav,
    logementsNav,
  } = navigationItemList;
  const router = useRouter();
  const [path, setPath] = useState(() => router.pathname || '');

  const displayAnnoncesLogement = process.env.NEXT_PUBLIC_LOGEMENT_FEATURE === '1';

  useEffect(() => {
    if (path !== router.pathname) {
      setPath(router.pathname);
    }
  }, [path, setPath, router]);

  return (
    <Container className={styles.headerModalContainer}>
      <nav role="navigation">
        <ul className={styles.headerModalNavigationList}>
          <NavItem className={styles.navItem} label={accueil.label} link={accueil.link} isActive={path === accueil.link} onClick={toggleModal}/>
          <NavItemWithSubItems className={styles.navItem} item={offresNav} path={path} onClick={toggleModal}/>
          <NavItemWithSubItems className={styles.navItem} item={orientationNav} path={path} onClick={toggleModal}/>
          <NavItemWithSubItems className={styles.navItem} item={accompagnementNav} path={path} onClick={toggleModal}/>
          <NavItemWithSubItems className={styles.navItem} item={engagementNav} path={path} onClick={toggleModal}/>
          { displayAnnoncesLogement && <NavItemWithSubItems className={styles.navItem} item={logementsNav} path={path} onClick={toggleModal}/>}
          <NavItemWithSubItems className={styles.navItem} item={employeurNav} path={path} onClick={toggleModal}/>
        </ul>
      </nav>
    </Container>
  );
}
