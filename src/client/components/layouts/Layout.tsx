import React from 'react';

import { Footer } from '~/client/components/layouts/Footer';
import { Header } from '~/client/components/layouts/Header';
import { SkipLink } from '~/client/components/ui/SkipLink/SkipLink';

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <SkipLink/>
      <Header/>
      <main id="contenu">
        {children}
      </main>
      <Footer/>
    </>
  );
}
