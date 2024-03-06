import React from 'react';

import { Head } from '~/client/components/head/Head';

import ErrorIncorrectRequest from '../client/components/layouts/Error/ErrorIncorrectRequest';

// NOTE (DORO 05-03-2024): Composant page non utilisé directement par Next.js, mais utilisé par ErrorServer.tsx
export default function BadRequest() {
	return (
		<>
			<Head
				robots="noindex"
				title="Demande incorrecte | 1jeune1solution"
			/>
			<main id="contenu">
				<ErrorIncorrectRequest />
			</main>
		</>
	);
}
