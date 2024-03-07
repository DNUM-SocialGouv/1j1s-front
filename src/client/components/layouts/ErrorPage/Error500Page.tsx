import React from 'react';

import { Head } from '../../head/Head';
import ErrorUnavailableService from '../Error/ErrorUnavailableService';

export default function Error500Page() {
	return (
		<>
			<Head
				title="Service indisponible | 1jeune1solution"
				robots="noindex"
			/>
			<main id="contenu">
				<ErrorUnavailableService />
			</main>
		</>
	);
}
