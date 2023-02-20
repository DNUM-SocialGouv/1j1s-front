import React from 'react';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';

export default function FormationAlternancePage() {
	return (
		<>
			<Head
				title="Rechercher une formation en apprentissage | 1jeune1solution"
				robots="index,follow"
			/>
			<main id="contenu">
				<LightHero>
					<h1>
						<LightHeroPrimaryText>Des milliers de formations en alternance</LightHeroPrimaryText>
						<LightHeroSecondaryText>pour vous permettre de réaliser votre projet professionnel</LightHeroSecondaryText>
					</h1>
				</LightHero>
			</main>
		</>
	);
};

export async function getServerSideProps() {
	const isFormationActive = process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE === '1';
	if (!isFormationActive) {
		return { notFound: true };
	}

	return {
		props: {},
	};
}
