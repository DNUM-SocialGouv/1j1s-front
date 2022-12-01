import React from 'react';

import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function FormationPage() {
  return (
    <>
      <HeadTag title="Créer mon CV personnalisé | 1jeune1solution"/>
      <main id="contenu">
        <HeroWithButtonLink
          titlePrimaryText="Je crée un CV personnalisé qui valorise mes compétences "
          titleSecondaryText="et s’adapte à chaque annonce"
          content={heroCVContent()}
          buttonHref="https://cv.1jeune1solution.beta.gouv.fr/#/connexion"
          buttonLabel="Je crée mon CV"
          imgSrc="/images/créer-son-cv.webp"
        />
      </main>
    </>
  );
};

function heroCVContent() {
  return(
    <span>Booster vos chances de trouver un emploi en personnalisant votre CV et en mettant en valeur vos compétences en fonction des annonces auxquelles vous postulez.</span>
  );
};
