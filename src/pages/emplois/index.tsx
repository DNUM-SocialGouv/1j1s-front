import React from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function RechercherOffreEmploiPage() {
  return (
    <>
      <HeadTag
        title="Rechercher un emploi | 1jeune1solution"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <RechercherOffreEmploi />
    </>
  );
}
