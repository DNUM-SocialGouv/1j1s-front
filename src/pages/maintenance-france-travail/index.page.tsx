import type { ReactElement } from 'react';
import React from 'react';

import MaintenanceFranceTravail from '~/client/components/features/MaintenanceFranceTravail/MaintenanceFranceTravail';
import { LayoutMaintenance } from '~/client/components/layouts/LayoutMaintenance';
import type { NextPageWithLayout } from '~/pages/_app.page';

const Page: NextPageWithLayout = () => {
	return (
		<MaintenanceFranceTravail />
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutMaintenance>{page}</LayoutMaintenance>
	);
};
export default Page;
