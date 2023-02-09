import React from 'react';

import {
	RéférencerEntreprises,
} from '~/client/components/features/Immersions/ReferencesEntreprises/RéférencerEntreprises';
import AidesExceptionnelles
	from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import { Head } from '~/client/components/head/Head';

export default function Immersions() {
	return (
		<>
			<Head
				title="Je propose des immersions | 1jeune1solution"
				robots="index,follow"
			/>
			<main id="contenu">
				<RéférencerEntreprises />
				<AidesExceptionnelles />
			</main>
		</>
	);
}
