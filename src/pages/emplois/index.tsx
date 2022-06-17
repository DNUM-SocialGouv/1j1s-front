import React from 'react';

import { RechercherOffre } from '~/client/components/features/RechercherOffre/RechercherOffre';

export default function RechercherOffreEmploiPage() {
  return (
    <RechercherOffre
      prefixTitle="Rechercher un emploi"
      description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      heroTitle={<>Des milliers d&apos;<b>offres d&apos;emplois<br/>sélectionnées pour vous</b> par<br/>Pôle Emploi</>}
      isNiveauDemandéActive={true}
      isTempsDeTravailActive={true}
      isTypeDeContratActive={true}
      descriptionNombreRésultat="offres d'emplois"
      barreDeRecherchePlaceHolder="Exemple : boulanger, informatique..."
      urlLienOffre="emplois"
    />
  );
}
