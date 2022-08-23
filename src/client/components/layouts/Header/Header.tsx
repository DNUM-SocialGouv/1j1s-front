import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { buildNavigation, HeaderNav } from '~/client/components/layouts/Header/HeaderNav';
import { NavItem } from '~/client/components/layouts/Header/NavItem';

export function Header() {
  const router = useRouter();
  const [path, setPath] = useState(() => router.pathname || '');

  useEffect(() => {
    if (path !== router.pathname){
      setPath(router.pathname);
    }
  }, [path, setPath, router]);

  return (
    <header
      className={styles.header}
      role="banner"
    >
      <HeaderBody/>
      <HeaderNav>
        <NavItem title="Accueil" link="/" current={path === '/'}/>
        {buildNavigation(path, false)}
      </HeaderNav>
    </header>
  );
}
