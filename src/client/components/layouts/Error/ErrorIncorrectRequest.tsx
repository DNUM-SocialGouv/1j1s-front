import React from 'react';

import { ErrorLayout } from './ErrorLayout';

export default function ErrorIncorrectRequest() {
	return (
		<ErrorLayout>
	  <ErrorLayout.Title titleAs='h2'>Erreur - Demande Incorrecte</ErrorLayout.Title>
	  <ErrorLayout.SubTitle>
		Votre navigateur a envoyé une demande que ce serveur n’a pas pu comprendre.
	  </ErrorLayout.SubTitle>
		</ErrorLayout>
	);
}
