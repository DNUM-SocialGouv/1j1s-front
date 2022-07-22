import React from 'react';

import Allocations from '~/client/components/features/ContratEngagementJeune/Allocations/Allocations';
import Bannière from '~/client/components/features/ContratEngagementJeune/Bannière/Bannière';
import QuEstCeQueCEst from '~/client/components/features/ContratEngagementJeune/QuEstCeQueCest/QuEstCeQueCEst';
import PourquoiCEstFaitPourMoi from '~/pages/contrat-engagement-jeune/PourquoiCEstFaitPourMoi';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function ContratEngagementJeune() {
  return (
    <>
      <HeadTag
        title='Contrat Engagement Jeune'
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id='contenu'>
        <Bannière />
        <QuEstCeQueCEst />
        <PourquoiCEstFaitPourMoi/>
        <Allocations />
      </main>
    </>
  );
}
