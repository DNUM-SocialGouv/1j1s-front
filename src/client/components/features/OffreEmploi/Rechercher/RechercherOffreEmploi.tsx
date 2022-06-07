import React from 'react';

import { RechercherOffre } from '~/client/components/features/RechercherOffre/RechercherOffre';

export function RechercherOffreEmploi() {

  return (
    <RechercherOffre
      prefixTitle="Rechercher un emploi"
      description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      heroTitle="Des milliers d&apos;offres d&apos;emplois sélectionnées pour vous par Pôle Emploi"
      isNiveauDemandéActive={true}
    />
  );
}

