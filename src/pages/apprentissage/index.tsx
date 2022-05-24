import React from 'react';

import { RechercherAlternance } from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function RechercherAlternancePage() {
  return (
    <>
      <HeadTag
        title="Rechercher un contrat d'alternance | 1jeune1solution"
        description="Avec la Bonne Alternance, trouvez l'entreprise qu'il vous faut pour réaliser votre projet d'alternance"
      />
      <RechercherAlternance />
    </>
  );
}
