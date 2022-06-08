import React from 'react';

import { RechercherOffre } from '~/client/components/features/RechercherOffre/RechercherOffre';

export default function RechercherJobSaisonnierPage() {
  return (
    <RechercherOffre
      prefixTitle="Rechercher un emploi saisonnier"
      description="Plus de 400 000 offres d'emplois saisonniers pour vous"
      heroTitle="Des milliers d'emplois saisonniers sélectionnés pour vous par Pôle Emploi"
      defaultQueryParameters="typeContrat=CDD,MIS,SAI&dureeContratMax=2"
      isNiveauDemandéActive={false}
      isTypeDeContratActive={false}
      descriptionNombreRésultat="offres d'emplois saisonniers"
      barreDeRecherchePlaceHolder="Exemple : serveur, tourisme..."
    />
  );
}
