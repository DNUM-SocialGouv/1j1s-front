import Link from 'next/link';
import React from 'react';

import { Button } from '~/client/components/ui/Button/Button';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { Icon } from '~/client/components/ui/Icon/Icon';

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
      <Button
        buttonType="withRightIcon"
        icon={<Icon name="magnifying-glass" />}
        buttonOnDarkBackground
      >
        Rechercher une entreprise
      </Button>
      <br />
      <br />
      <Link href="/#offres"><a>Offres</a></Link><br />
      <Link href="/#formation"><a>Formation</a></Link><br />
      <Link href="/#aides-orientation-accompagnement"><a>Aides, orientation et accompagnement</a></Link><br />
      <Link href="/#engagement-benevolat"><a>Engagement et bénévolat</a></Link>
    </>
  );
}
