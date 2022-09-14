import React from 'react';

import MonEspaceEntreprise from '~/client/components/features/LesEntreprisesSEngagent/MonEspace/MonEspaceEntreprise';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function MesuresEmployeurs() {
  return (
    <>
      <HeadTag
        title="Mon espace employeur | 1jeune1solution"
        description="Accéder à mon espace employeur"
      />
      <main id="contenu">
        <MonEspaceEntreprise/>
      </main>
    </>
  );
}
