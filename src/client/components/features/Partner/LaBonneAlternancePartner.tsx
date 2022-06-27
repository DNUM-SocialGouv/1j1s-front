import React from 'react';

import { PartnerCard, PartnerTitleProps } from '~/client/components/features/Partner/Card/PartnerCard';

export function LaBonneAlternancePartner({ titleAs }: React.PropsWithChildren<PartnerTitleProps>) {
  return (
    <PartnerCard
      logo="/images/logos/la-bonne-alternance.svg"
      alt="La Bonne Alternance"
      link="https://labonnealternance.pole-emploi.fr/"
      title="Et si vous contactiez directement les entreprises ?"
      titleAs={titleAs}
      headline="N’envoyez plus vos CV au hasard !"
      headlineColor="#3A55D1"
      description="Identifiez et contactez les entreprises qui peuvent être susceptibles de recruter même si elles n’ont pas déposé d’offres. Nos outils détectent les entreprises qui vont probablement embaucher dans les 6 prochains mois."
    />
  );
}
