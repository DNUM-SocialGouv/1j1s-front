import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function ParcourSupPartner() {
  return (
    <PartnerCard
      linkLabel="Accéder à Parcoursup"
      logo="/images/logos/parcoursup.svg"
      link="https://www.parcoursup.fr/"
      alt="Parcoursup"
      description="Si vous êtes lycéen(ne) en réorientation, rendez-vous sur Parcoursup, la plateforme nationale de préinscription en première année de l’enseignement supérieur, pour candidater à la formation initiale de votre choix"
    />
  );
}
