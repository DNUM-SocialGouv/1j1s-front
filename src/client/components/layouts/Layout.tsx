import { SkiplinkItem, Skiplinks } from '@dataesr/react-dsfr';
import React from 'react';

import { Footer } from '~/client/components/layouts/Footer';
import { Header } from '~/client/components/layouts/Header';

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Skiplinks>
        <SkiplinkItem href="#contenu">Contenu</SkiplinkItem>
        <SkiplinkItem href="#header-navigation">Menu</SkiplinkItem>
        <SkiplinkItem href="#footer">Pied de page</SkiplinkItem>
      </Skiplinks>
      <Header/>
      {children}
      <Footer/>
    </>
  );
}
