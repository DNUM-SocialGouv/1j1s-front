import React from 'react';

import AidesExceptionnelles
	from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import { Head } from '~/client/components/head/Head';

import { PourQui } from './PourQui/PourQui';
import { Pourquoi } from './Pourquoi/Pourquoi';
import { QuEstCeQueLeMentorat } from './QuEstCeQueLeMentorat/QuEstCeQueLeMentorat';

export default function JeDeviensMentor() {
	return (
		<>
			<Head
				title="Je deviens mentor | 1jeune1solution"
				description="1 jeune 1 mentor, accompagner un jeune pour l’aider à réussir"
				robots="index,follow"
			/>
			<main id="contenu">
				<PourQui/>
				<QuEstCeQueLeMentorat/>
				<Pourquoi/>
				<AidesExceptionnelles/>
			</main>
		</>
	);
}

