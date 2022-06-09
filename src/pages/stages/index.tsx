import React from 'react';

import RechercherStage from '~/client/components/features/OffreStage/Rechercher/RechercherStage';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function RechercherOffreDeStagesPage() {
  return (
    <>
      <HeadTag
        title="Rechercher un contrat d'alternance | 1jeune1solution"
        description="Avec la Bonne Alternance, trouvez l'entreprise qu'il vous faut pour réaliser votre projet d'alternance"
      />
      <RechercherStage />
    </>
  );
}
