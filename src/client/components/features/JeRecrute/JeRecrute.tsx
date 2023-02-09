import AidesExceptionnelles
	from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import DecouvrirMesuresEmployeurs
	from '~/client/components/features/JeRecrute/DecouvrirMesuresEmployeurs/DecouvrirMesuresEmployeurs';
import { Head } from '~/client/components/head/Head';

import { DécouvrirDispositifs } from './DecouvrirDispositifs/DecouvrirDispositifs';

export function JeRecrute () {
	return (
		<>
			<Head
				title="Recruter et agir pour les jeunes | 1jeune1solution"
				description="Emploi, formation, accompagnement"
				robots="index,follow"
			/>
			<main id="contenu">
				<DécouvrirDispositifs />
				<DecouvrirMesuresEmployeurs />
				<AidesExceptionnelles />
			</main>
		</>
	);
}
