import {
  Header as HeaderDSFR,
  HeaderBody,
  HeaderNav,
  HeaderOperator,
  Logo,
  NavItem,
  NavSubItem,
  Service,
} from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from '~/client/components/layouts/Header.module.css';

export function Header() {
  const router = useRouter();
  const [path, setPath] = useState(() => router.pathname || '');

  useEffect(() => {
    if (path !== router.pathname) {
      setPath(router.pathname);
    }
  }, [path, setPath, router]);

  return (
    <HeaderDSFR key={path}>
      <HeaderBody>
        <Logo splitCharacter={10}>République Française</Logo>
        <HeaderOperator>
          <Image
            src="/images/france-relance.svg"
            alt="France Relance"
            width="200"
            height="66"
          />
        </HeaderOperator>
        <Service className={styles.title} title="1jeune1solution" description="" />
      </HeaderBody>
      <HeaderNav >
        <div className={styles.navLinks}>
          <NavItem title="Accueil" asLink={<NavItemLink link="/" current={path === '/'} />} />
          <NavItem title="Offres">
            <NavSubItem title="Emplois" asLink={<NavItemLink link="/emplois" current={path === '/emplois'} />} />
          </NavItem>
        </div>
      </HeaderNav>
    </HeaderDSFR>
  );
}

interface NavItemLinkProps {
  current: boolean
  link: string
}

function NavItemLink({ children, current, link }: React.PropsWithChildren<NavItemLinkProps>) {
  return (
    <Link href={link}>
      <a className="fr-nav__link" {... (current && { 'aria-current': 'page' })}>
        {children}
      </a>
    </Link>
  );
}
