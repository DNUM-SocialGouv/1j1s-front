import React from 'react';

import { RechercherOffre } from '~/client/components/features/RechercherOffre/RechercherOffre';

export default function RechercherJobSaisonnierPage() {
  return (
    <RechercherOffre
      prefixTitle="Rechercher un job saisonnier"
      description="Plus de 400 000 offres de job saisonnier pour vous"
      heroTitle="Des milliers de jobs saisonnier sélectionnés pour vous par Pôle Emploi"
      defaultQueryParameters="typeContrat=CDD,MIS,SAI&dureeContratMax=2"
      isNiveauDemandéActive={false}
      descriptionNombreRésultat="jobs saisonnier"
    />
  );
}
