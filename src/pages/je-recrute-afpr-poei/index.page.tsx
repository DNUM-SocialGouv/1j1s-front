import React from 'react';

import AidesExceptionnelles from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import RecrutementCandidatPôleEmploi from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/RecrutementCandidatPôleEmploi';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';

export default function JeRecruteAfprPoei() {
	useAnalytics('je-recrute-afpr-poei');

	return (
		<>
			<Head
				title="Je forme les jeunes grâce à l‘emploi | 1jeune1solution"
				description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
				robots="index,follow"
			/>
			<main id="contenu">
				<RecrutementCandidatPôleEmploi/>
				<AidesExceptionnelles/>
			</main>
		</>
	);
}
