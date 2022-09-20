import React from 'react';

import { RechercherAlternance } from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import useReferrer from '~/client/hooks/useReferrer';

export default function RechercherAlternancePage() {
  useReferrer();

  return (
    <RechercherAlternance />
  );
}
