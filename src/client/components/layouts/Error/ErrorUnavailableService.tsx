import React from 'react';

import { ErrorLayout } from './ErrorLayout';

export default function ErrorUnavailableService() {
  return (
    <ErrorLayout>
	  <ErrorLayout.Title titleAs='h2'>Service Indisponible</ErrorLayout.Title>
	  <ErrorLayout.SubTitle>
		Désolé, le service est temporairement inaccessible, la page demandée ne peut pas être affichée.
	  </ErrorLayout.SubTitle>
	  <ErrorLayout.Content>
		Merci de réessayer plus tard, vous serez bientôt en mesure de réutiliser le service. Si vous avez besoin d’une aide immédiate, merci de nous contacter.
	  </ErrorLayout.Content>
    </ErrorLayout>
  );
}
