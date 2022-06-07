import React from 'react';

import { RechercherOffre } from '~/client/components/features/RechercherOffre/RechercherOffre';

export function RechercherOffreJobEtudiant() {

  return (
    <RechercherOffre
      prefixTitle="Rechercher un job étudiant"
      description="Plus de 400 000 offres de job étudiant pour vous"
      heroTitle="Des milliers de jobs étudiant sélectionnées pour vous par Pôle Emploi"
      defaultQueryParameters="natureContrat=E1"
      isNiveauDemandéActive={false}
    />
  );
}

