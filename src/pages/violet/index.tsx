import React from 'react';

import { ButtonPrimary } from '~/client/components/ui/Button/ButtonPrimary';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';

export default function OnSamuse() {
  return (
    <>
      <Hero image="/images/purple.webp">
        <b>Salut, l&apos;équipe violette taff ici !</b><br />
      </Hero>
      <br />
      Un cadeau de l&apos;équipe <strong style={{ color: 'yellow' }}>jaune</strong>, un beau bouton :) juste ici
      <br />
      <br />
      <ButtonPrimary icon={<MagnifyingGlassIcon color="#161616"/>}>Rechercher une entreprise</ButtonPrimary>
      <br />
      <br />
    </>
  );
}
