
import React from 'react';

import { Alternance } from '~/server/alternances/domain/alternance';

interface ConsulterOffreAlternanceProps {
  offreAlternance: Alternance
}

export function ConsulterOffreAlternance(props: ConsulterOffreAlternanceProps) {
  const { offreAlternance } = props;

  return (
    <main id="contenu">
      <h1>{offreAlternance.intitulé}</h1>
    </main>
  );
}
