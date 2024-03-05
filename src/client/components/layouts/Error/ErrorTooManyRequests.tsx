import React from 'react';

import { ErrorLayout } from './ErrorLayout';

export default function ErrorTooManyRequests() {
	return (
		<ErrorLayout>
			<ErrorLayout.Title titleAs="h2">Trop de requêtes</ErrorLayout.Title>
			<ErrorLayout.SubTitle>
				Vous avez effectué trop de requêtes en peu de temps. Veuillez réessayer ultérieurement.
			</ErrorLayout.SubTitle>
			<ErrorLayout.Content>
				Si le problème persiste, merci de nous contacter pour obtenir de l’aide.
			</ErrorLayout.Content>
		</ErrorLayout>
	);
}
