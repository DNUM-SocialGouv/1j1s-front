import React from 'react';

import { PartnerCard } from './Card/PartnerCard';

export function PoleEmploiCard() {
  return (
    <PartnerCard
      title="Pôle Emploi propose un accompagnement intensif pour les jeunes de 16 à 30 ans"
      description="Avec son dispositif d’accompagnement intensif des jeunes (AIJ), Pôle emploi propose à tous les jeunes demandeurs d’emploi de 16 à 30 ans, un accompagnement personnalisé intensif d’une durée de 3 à 6 mois pour les aider à trouver ou retrouver plus rapidement un emploi. "
      logo="/images/logos/pole-emploi.svg"
      link="/articles/pole-emploi"
      linkLabel="En savoir plus"
    />
  );
}
