import React from 'react';

import { RechercherOffre } from '~/client/components/features/RechercherOffre/RechercherOffre';

export default function RechercherJobEtudiantPage() {
  return (
    <RechercherOffre
      prefixTitle="Rechercher un job étudiants"
      description="Plus de 400 000 offres de jobs étudiants pour vous"
      heroTitle={<>Des milliers de <b>jobs étudiants<br/>sélectionnés pour vous</b> par<br/>Pôle Emploi</>}
      defaultQueryParameters="typeDeContrats=CDD,MIS,SAI&dureeHebdoMax=1600&tempsDeTravail=tempsPartiel"
      isNiveauDemandéActive={false}
      isTempsDeTravailActive={false}
      isTypeDeContratActive={false}
      descriptionNombreRésultat="offres de jobs étudiants"
      barreDeRecherchePlaceHolder="Exemple : serveur, tourisme..."
      urlLienOffre="jobs-etudiants"
    />
  );
}
