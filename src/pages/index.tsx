import { Title } from '@dataesr/react-dsfr';
import React from 'react';

import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function Accueil() {

  return (
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes" />
      <Hero image="/images/banners/homepage.jpg">
        <Title as="h1" look="h4">A chacun sa solution.</Title>
        <p>Vous avez entre 13 et 30 ans ? Découvrez toutes les solutions pour votre avenir sur 1J1S !</p>
      </Hero>
      <main id="contenu"></main>
    </>
  );
}
