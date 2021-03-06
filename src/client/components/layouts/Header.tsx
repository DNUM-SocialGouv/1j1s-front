import {
  Header as HeaderDSFR,
  HeaderBody,
  HeaderNav,
  HeaderOperator,
  Logo,
  NavSubItem,
  Service,
} from '@dataesr/react-dsfr';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const NavItem = dynamic(() => import('@dataesr/react-dsfr').then((reactDSFR) => reactDSFR.NavItem), { ssr: false });

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
            src="/images/logos/france-relance.svg"
            alt="France Relance"
            width="200"
            height="66"
          />
        </HeaderOperator>
        <Service title="1jeune1solution" description="" />
      </HeaderBody>
      <HeaderNav>
        <NavItem title="Accueil" asLink={<NavItemLink link="/" current={path === '/'} />} />
        <NavItem title="Offres">
          <NavSubItem title="Emplois" asLink={<NavItemLink link="/emplois" current={path === '/emplois'} />} />
          <NavSubItem title="Contrats d'alternance" asLink={<NavItemLink link="/apprentissage" current={path === '/apprentissage'} />} />
          <NavSubItem title="Jobs étudiants" asLink={<NavItemLink link="/jobs-etudiants" current={path === '/jobs-etudiants'} />} />
        </NavItem>
        <NavItem title="Aides, orientation et accompagnement">
          <NavSubItem title="Contrat Engagement Jeune" asLink={<NavItemLink link="/contrat-engagement-jeune" current={path === '/contrat-engagement-jeune'} />} />
          <NavSubItem title="Mentorat" asLink={<NavItemLink link="/mentorat" current={path === '/mentorat'} />} />
        </NavItem>
        <NavItem title="Engagement et bénévolat">
          <NavSubItem title="Service Civique" asLink={<NavItemLink link="/service-civique" current={path === '/services-civique'} />} />
          <NavSubItem title="Bénévolat" asLink={<NavItemLink link="/benevolat" current={path === '/benevolat'} />} />
        </NavItem>
        <NavItem title="Employeur">
          <NavSubItem title="On s'amuse" asLink={<NavItemLink link="/violet" current={path === '/violet'} />} />
        </NavItem>
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
      <a className="fr-nav__link" data-testid={`navLink_${link}`} {... (current && { 'aria-current': 'page' })}>
        {children}
      </a>
    </Link>
  );
}
