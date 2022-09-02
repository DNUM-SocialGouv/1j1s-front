import React from 'react';

import Bannière from '~/client/components/features/MesuresEmployeurs/Bannière/Bannière';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function MesuresEmployeurs() {
  return (
    <>
      <HeadTag
        title="Mesures Employeurs | 1jeune1solution"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu">
        <Bannière />
      </main>
    </>
  );
}
