import React from 'react';

import { Head } from '~/client/components/head/Head';
import ErrorNotFound from '~/client/components/layouts/Error/ErrorNotFound';

export default function NotFound() {
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
