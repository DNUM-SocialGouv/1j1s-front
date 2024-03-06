import React from 'react';

import { ErrorLayout } from './ErrorLayout';

export default function ErrorIdentifierConflict() {
	return (
		<ErrorLayout>
			<ErrorLayout.Title titleAs="h2">Erreur - Requête en conflit</ErrorLayout.Title>
			<ErrorLayout.SubTitle>
				La demande ne peut pas être traitée car elle est en conflit avec une autre demande.
			</ErrorLayout.SubTitle>
			<ErrorLayout.Content>
				Si le problème persiste, merci de nous contacter pour obtenir de l’aide.
			</ErrorLayout.Content>
		</ErrorLayout>
	);
}
