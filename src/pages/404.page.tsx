import React from 'react';

import ErrorNotFound from '~/client/components/layouts/Error/ErrorNotFound';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function NotFound() {
	return (
		<>
			<HeadTag
				title={'Page indisponible | 1jeune1solution'}
			/>
			<main id="contenu">
				<ErrorNotFound />
			</main>
		</>
	);
}
