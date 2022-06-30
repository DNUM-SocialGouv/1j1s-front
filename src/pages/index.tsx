import React from 'react';

import { Hero } from '~/client/components/ui/Hero/Hero';
import { BookIcon } from '~/client/components/ui/Icon/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/brief-case.icon';
import { CompassIcon } from '~/client/components/ui/Icon/compass.icon';
import { TrophyIcon } from '~/client/components/ui/Icon/trophy.icon';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function Accueil() {

  return (
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes" />
      <Hero image="/images/banners/homepage.webp">
        <b>A chacun sa solution.</b><br />
        Vous avez entre 13 et 30 ans ?<br/>
        Découvrez toutes les solutions pour<br />
        votre avenir sur 1J1S !
      </Hero>
      <main id="contenu">
        Test des icônes :
        <div>
          <BriefCaseIcon />
        </div>
        <div>
          <BookIcon />
        </div>
        <div>
          <CompassIcon />
        </div>
        <div>
          <TrophyIcon />
        </div>
      </main>
    </>
  );
}
