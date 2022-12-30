import React from 'react';

import { ErrorLayout } from './ErrorLayout';

export default function ErrorNotFound() {
	return (
		<ErrorLayout>
	  <ErrorLayout.Title titleAs='h1'>Page non trouvée</ErrorLayout.Title>
	  <ErrorLayout.SubTitle>
		La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.
	  </ErrorLayout.SubTitle>
	  <ErrorLayout.Content>
		Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil.
	  </ErrorLayout.Content>
		</ErrorLayout>
	);
}
