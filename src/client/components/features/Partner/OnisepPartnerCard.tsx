import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function OnisepPartnerCard() {
  return (
    <PartnerCard
      description="Trouvez un métier qui vous correspond parmi plus de 700 fiches."
      headline="Renseignez-vous sur les différents métiers avec l'ONISEP."
      headlineColor="#C52E25"
      linkLabel="Je découvre les métiers"
      link="/decouvrir-les-metiers"
      logo="/images/logos/onisep.svg"
      title="Besoin d'informations sur les métiers ?"
    />
  );
}
