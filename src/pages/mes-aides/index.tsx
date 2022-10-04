import React from 'react';

import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function MesAidesPage() {

  return (
    <>
      <HeadTag title="Mes aides financières | 1jeune1solution" />
      <main id="contenu">
        <div className={'background-white-lilac'}>
          <HeroWithButtonLink
            titlePrimaryText="Je découvre les aides auxquelles j’ai droit en moins de 5 minutes"
            content={heroAidesContent()}
            buttonHref="https://mes-aides.1jeune1solution.beta.gouv.fr/simulation/individu/demandeur/date_naissance"
            buttonLabel="Je commence la simulation"
            imgSrc="/images/aides-financières.webp"
          />

        </div>

        {/* next section is hidden until cookies are set
        <MesAidesVideos/>
        */}


      </main>
    </>
  );
}

function heroAidesContent() {
  return(
    <p>Avant de démarrer la simulation de vos aides, pensez à vous munir de vos ressources et de celles de vos parents si vous êtes encore à leur charge.</p>
  );
};
