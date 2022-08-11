import React from 'react';

import { Footer } from '~/client/components/layouts/Footer/Footer';
import { Header } from '~/client/components/layouts/Header/Header';
import { SkipLink } from '~/client/components/ui/SkipLink/SkipLink';

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <SkipLink/>
      <Header/>
      {children}
      <Footer/>
    </>
  );
}
