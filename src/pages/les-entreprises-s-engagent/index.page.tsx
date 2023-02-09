import React from 'react';

import AvantagesMobilisation from '~/client/components/features/LesEntreprisesSEngagent/Avantages/AvantagesMobilisation';
import RejoignezMobilisation from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/RejoignezMobilisation';
import { Head } from '~/client/components/head/Head';


export default function LesEntreprisesSEngagent() {
	return (
		<>
			<Head
				title="Les entreprises s'engagent | 1jeune1solution"
				description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
				robots="index,follow"
			/>
			<main id="contenu">
				<RejoignezMobilisation/>
				<AvantagesMobilisation/>
			</main>
		</>
	);
}
