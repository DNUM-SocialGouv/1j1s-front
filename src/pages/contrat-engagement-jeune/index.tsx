import React from 'react';

import Allocations from '~/pages/contrat-engagement-jeune/Allocations';
import Bannière from '~/pages/contrat-engagement-jeune/Bannière';
import PourquoiCEstFaitPourMoi from '~/pages/contrat-engagement-jeune/PourquoiCEstFaitPourMoi';
import QuEstCeQueCEst from '~/pages/contrat-engagement-jeune/QuEstCeQueCEst';


export default function ContratEngagementJeune() {
  return (
    <>
      <Bannière/>
      <QuEstCeQueCEst />
      <PourquoiCEstFaitPourMoi/>
      <Allocations />
    </>
  );
}
