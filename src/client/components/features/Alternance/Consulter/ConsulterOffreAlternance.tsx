
import React from 'react';

import {
  Alternance,
  isAlternanceMatcha,
  isAlternancePeJob,
} from '~/server/alternances/domain/alternance';

interface ConsulterOffreAlternanceProps {
  offreAlternance: Alternance
}

export function ConsulterOffreAlternance(props: ConsulterOffreAlternanceProps) {
  const { offreAlternance } = props;
  console.log('offreAlternance', offreAlternance.ideaType, offreAlternance);

  if (isAlternanceMatcha(offreAlternance)) {
    return (
      <main id="contenu">
        <h1>{offreAlternance.intitulé}</h1>
      </main>
    );
  }

  if (isAlternancePeJob(offreAlternance)) {
    return (
      <main id="contenu">
        <h1>{offreAlternance.intitulé}</h1>
      </main>
    );
  }
  return null;

}
