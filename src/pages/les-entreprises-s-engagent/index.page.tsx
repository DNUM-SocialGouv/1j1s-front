import React from 'react';

import AvantagesMobilisation from '~/client/components/features/LesEntreprisesSEngagent/Avantages/AvantagesMobilisation';
import RejoignezMobilisation from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/RejoignezMobilisation';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';

export default function LesEntreprisesSEngagent() {
	useAnalytics('les-entreprises-s-engagent');

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
