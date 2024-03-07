import React from 'react';

import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/404.analytics';

import Error404Page from '../client/components/layouts/ErrorPage/Error404Page';

export default function NotFound() {
	useAnalytics(analytics);

	return (
		<Error404Page />
	);
}
