import React from 'react';

import { PartnerCard, PartnerTitleProps } from '~/client/components/features/Partner/Card/PartnerCard';

export function ServiceCiviquePartner({ titleAs }: React.PropsWithChildren<PartnerTitleProps>) {
  return (
    <PartnerCard
      logo="/images/logos/service-civique.svg"
      alt="Service civique"
      link="https://www.service-civique.gouv.fr/trouver-ma-mission?page=1"
      title="Le Service Civique, pour acquérir de l'expérience et préparer son avenir"
      titleAs={titleAs}
      headline="Avec ou sans diplôme, engagez-vous dans des missions d'intérêt général en France ou à l'étranger."
      headlineColor="#0C7EC4"
      description="Indemnisé 580€/mois, il vous permettra d'acquérir ou de développer vos compétences dans de nombreux domaines.(Ouvert aux 16-25 ans. 30 ans pour les jeunes en situation de handicap)"
    />
  );
}
