import React from 'react';

import { RechercherOffre } from '~/client/components/features/RechercherOffre/RechercherOffre';

export default function RechercherJobSaisonnierPage() {
  return (
    <RechercherOffre
      prefixTitle="Rechercher un emploi saisonnier"
      description="Plus de 400 000 offres de jobs étudiants pour vous"
      heroTitle="Des milliers de jobs étudiants sélectionnés pour vous par Pôle Emploi"
      defaultQueryParameters="typeContrat=CDD,MIS,SAI&dureeContratMax=2"
      isNiveauDemandéActive={false}
      isTypeDeContratActive={false}
      descriptionNombreRésultat="offres de jobs étudiants"
      barreDeRecherchePlaceHolder="Exemple : serveur, tourisme..."
      urlLienOffre="jobs-ete"
    />
  );
}
