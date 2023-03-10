import React from 'react';

import { Head } from '~/client/components/head/Head';
import ErrorNotFound from '~/client/components/layouts/Error/ErrorNotFound';
import useAnalytics from '~/client/hooks/useAnalytics';

export default function NotFound() {
	useAnalytics('404');

	return (
		<>
			<Head
				title={'Page indisponible | 1jeune1solution'}
				robots="noindex"
			/>
			<main id="contenu">
				<ErrorNotFound />
			</main>
		</>
	);
}
