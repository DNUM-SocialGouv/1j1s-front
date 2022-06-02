import React from 'react';

import { PartnerCard, PartnerTitleProps } from '~/client/components/features/Partner/Card/PartnerCard';

export function LaBonneBoitePartner({ titleAs }: React.PropsWithChildren<PartnerTitleProps>) {
  return (
    <PartnerCard
      logo="/images/logos/la-bonne-boite.svg"
      alt="La bonne boîte"
      link="https://labonneboite.pole-emploi.fr/"
      title="Et si vous contactiez directement les entreprises ?"
      titleAs={titleAs}
      headline="N'envoyez plus vos CV au hasard !"
      headlineColor="#C7297E"
      description="Identifiez et contactez les entreprises qui peuvent être susceptibles de recruter même si elles n'ont pas déposé d'offres. Nos outils détectent les entreprises qui vont probablement embaucher dans les 6 prochains mois."
    />
  );
}
