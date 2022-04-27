import {
  Header as HeaderDSFR,
  HeaderBody,
  HeaderNav,
  HeaderOperator,
  Logo,
  NavItem,
  Service,
} from '@dataesr/react-dsfr';
import React from 'react';

export const Header = () => {
  return (
    <HeaderDSFR>
      <HeaderBody>
        <Logo splitCharacter={10}>République Française</Logo>
        <HeaderOperator>
          <img
            src="/images/france-relance.svg"
            alt="France Relance"
            width="200"
            height="66"
          />
        </HeaderOperator>
        <Service title="1jeune1solution" description="" />
      </HeaderBody>
      <HeaderNav>
        <NavItem title="Accueil" link="/" />
        <NavItem title="Emplois" link="/emplois" />
      </HeaderNav>
    </HeaderDSFR>
  );
};
