import React from 'react';

import { PartnerCard, PartnerTitleProps } from '~/client/components/features/Partner/Card/PartnerCard';

export function SimulationAlternancePartner({ titleAs }: React.PropsWithChildren<PartnerTitleProps>) {
  return (
    <PartnerCard
      logo="/images/logos/simulation-alternance.svg"
      alt="Simulateur alternant"
      link="https://www.alternance.emploi.gouv.fr/simulateur-alternant/etape-1"
      title="Vous êtes alternant ?"
      titleAs={titleAs}
      headline="Simulez en quelques clics"
      headlineColor="#000091"
      description="et moins de 3 minutes le montant de la rémunération à laquelle vous aurez droit en fonction de votre formation et de votre contrat. "
    />
  );
}
