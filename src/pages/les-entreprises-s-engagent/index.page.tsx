import React from 'react';

import AvantagesMobilisation from '~/client/components/features/LesEntreprisesSEngagent/Avantages/AvantagesMobilisation';
import RejoignezMobilisation from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/RejoignezMobilisation';
import { HeadTag } from '~/client/components/utils/HeaderTag';


export default function LesEntreprisesSEngagent() {
	return (
		<>
			<HeadTag
				title="Les entreprises s'engagent | 1jeune1solution"
				description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
			/>
			<main id="contenu">
				<RejoignezMobilisation/>
				<AvantagesMobilisation/>
			</main>
		</>
	);
}
