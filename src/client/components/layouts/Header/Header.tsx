import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNav } from '~/client/components/layouts/Header/HeaderNav';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { NavSubItem } from '~/client/components/layouts/Header/NavSubItem';

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
        <NavItem title="Offres">
          <NavSubItem title="Emplois" link="/emplois" current={path === '/emplois'} />
          <NavSubItem title="Stages" link="/stages" current={path === '/stages'} />
          <NavSubItem title="Apprentissage" link="/apprentissage" current={path === '/apprentissage'} />
          <NavSubItem title="Jobs étudiants" link="/jobs-etudiants" current={path === '/jobs-etudiants'} />
        </NavItem>
        <NavItem title="Aides, orientation et accompagnement">
          <NavSubItem title="Contrat Engagement Jeune" link="/contrat-engagement-jeune" current={path === '/contrat-engagement-jeune'} />
          <NavSubItem title="Mes aides financières" link="/mes-aides" current={path === '/mes-aides'} />
          <NavSubItem title="Mentorat" link="/mentorat" current={path === '/mentorat'} />
          <NavSubItem title="Les mesures jeunes" link="/mesures-jeunes" current={path === '/mesures-jeunes'} />
        </NavItem>
        <NavItem title="Engagement et bénévolat">
          <NavSubItem title="Service civique" link="/service-civique" current={path === '/service-civique'} />
          <NavSubItem title="Bénévolat" link="/benevolat" current={path === '/benevolat'} />
        </NavItem>
        <NavItem title="Employeur">
          <NavSubItem title="On s'amuse" link="/violet" current={path === '/violet'} />
        </NavItem>
      </HeaderNav>
    </header>
  );
}
