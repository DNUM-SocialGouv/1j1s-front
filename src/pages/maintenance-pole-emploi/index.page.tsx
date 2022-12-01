import type { ReactElement } from 'react';
import React from 'react';

import MaintenancePoleEmploi from '~/client/components/features/MaintenancePoleEmploi/MaintenancePoleEmploi';
import { LayoutMaintenance } from '~/client/components/layouts/LayoutMaintenance';
import type { NextPageWithLayout } from '~/pages/_app.page';

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
