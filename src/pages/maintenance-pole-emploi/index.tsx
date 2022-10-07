import type { ReactElement } from 'react';
import React from 'react';

import { LayoutMaintenance } from '~/client/components/layouts/LayoutMaintenance';
import type { NextPageWithLayout } from '~/pages/_app';
import MaintenancePoleEmploi from '~/pages/maintenance-pole-emploi/MaintenancePoleEmploi';

const Page: NextPageWithLayout = () => {
  return (
    <MaintenancePoleEmploi />
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutMaintenance>{page}</LayoutMaintenance>
  );
};
export default Page;
