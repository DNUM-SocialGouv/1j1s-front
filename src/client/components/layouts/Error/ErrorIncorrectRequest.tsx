import React from 'react';

import { ErrorLayout } from './ErrorLayout';

export default function ErrorIncorrectRequest() {
	return (
		<ErrorLayout>
	  <ErrorLayout.Title titleAs='h2'>Demande Incorrecte</ErrorLayout.Title>
	  <ErrorLayout.SubTitle>
		La demande n’a pas pu être traitée. Veuillez réessayer ultérieurement.
	  </ErrorLayout.SubTitle>
	  <ErrorLayout.Content>
		Si le problème persiste, merci de nous contacter pour obtenir de l’aide.
	  </ErrorLayout.Content>
		</ErrorLayout>
	);
}
