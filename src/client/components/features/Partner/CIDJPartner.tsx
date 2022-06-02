import React from 'react';

import { PartnerCard, PartnerTitleProps } from '~/client/components/features/Partner/Card/PartnerCard';

export function CIDJPartner({ titleAs }: React.PropsWithChildren<PartnerTitleProps>) {
  return (
    <PartnerCard
      logo="/images/logos/cidj.svg"
      alt="Centre d'information et de documentation pour la jeunesse"
      link="https://www.cidj.com/orientation-metiers"
      title="Besoin d'informations sur les métiers ?"
      titleAs={titleAs}
      headline="Renseignez-vous sur les différents secteurs d'activité et métiers avec le CIDJ."
      headlineColor="#5F2885"
      description="Vous y trouverez des fiches métiers par secteur, centre d'intérêt et opportunités de recrutement afin d'affiner vos choix d'orientation."
    />
  );
}
