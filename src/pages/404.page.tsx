import React from 'react';

import { HeadTag } from '~/client/components/head/HeaderTag';
import { MetaNoIndex } from '~/client/components/head/MetaNoIndex.head';
import ErrorNotFound from '~/client/components/layouts/Error/ErrorNotFound';

export default function NotFound() {
	return (
		<>
			<HeadTag
				title={'Page indisponible | 1jeune1solution'}
			/>
			<MetaNoIndex />
			<main id="contenu">
				<ErrorNotFound />
			</main>
		</>
	);
}
