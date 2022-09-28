import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function OnisepPartnerCard() {
  return (
    <PartnerCard
      alt="Centre d’Information et de Documentation Jeunesse"
      description="Trouvez un métier qui vous correspond parmi plus de 700 fiches."
      headline="Renseignez-vous sur les différents métiers avec l'ONISEP."
      headlineColor="#C52E25"
      linkLabel="Je découvre les métiers"
      link="/decouvrir-les-metiers"
      logo="/images/logos/onisep.svg"
      logoRatio='paysage'
      title="Besoin d'informations sur les métiers ?"
    />
  );
}
