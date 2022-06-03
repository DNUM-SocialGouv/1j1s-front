import React from 'react';

import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function Accueil() {

  return (
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes" />
      <Hero>
        <h1>A chacun sa solution.</h1>
        <p>Vous avez entre 13 et 30 ans ? Découvrez toutes les solutions pour votre avenir sur 1J1S !</p>
      </Hero>
      <main id="contenu"></main>
    </>
  );
}
