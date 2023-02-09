import React from 'react';

import MonEspaceEntreprise from '~/client/components/features/LesEntreprisesSEngagent/MonEspace/MonEspaceEntreprise';
import { Objectifs } from '~/client/components/features/LesEntreprisesSEngagent/MonEspace/Objectifs/Objectifs';
import { Head } from '~/client/components/head/Head';

export default function MesuresEmployeurs() {
	return (
		<>
			<Head
				title="Mon espace employeur | 1jeune1solution"
				description="Accéder à mon espace employeur"
				robots="index,follow"
			/>
			<main id="contenu">
				<MonEspaceEntreprise/>
				<Objectifs />
			</main>
		</>
	);
}
