import React from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import useReferrer from '~/client/hooks/useReferrer';

export default function RechercherOffreEmploiPage() {
  useReferrer();
  
  return (
    <RechercherOffreEmploi />
  );
}
