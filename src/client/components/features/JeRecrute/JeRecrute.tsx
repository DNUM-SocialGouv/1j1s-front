import DecouvrirMesuresEmployeurs
	from '~/client/components/features/JeRecrute/DecouvrirMesuresEmployeurs/DecouvrirMesuresEmployeurs';
import { Head } from '~/client/components/head/Head';
import BanniereRejoindreLaMobilisation
	from '~/client/components/ui/Baniere/BanniereRejoindreLaMobilisation/BanniereRejoindreLaMobilisation';

import { DécouvrirDispositifs } from './DecouvrirDispositifs/DecouvrirDispositifs';
import DecouvrirMesuresEmployeursEtApprentissage
	from './DecouvrirMesuresEmployeursEtApprentissage/DecouvrirMesuresEmployeursEtApprentissage';

export function JeRecrute () {
	const featureActivated = process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1';

	return (
		<>
			<Head
				title="Recruter et agir pour les jeunes | 1jeune1solution"
				description="Emploi, formation, accompagnement"
				robots="index,follow"
			/>
			<main id="contenu">
				<DécouvrirDispositifs />
				{featureActivated ?
					<DecouvrirMesuresEmployeursEtApprentissage />
					:
					<DecouvrirMesuresEmployeurs />
				}
				<BanniereRejoindreLaMobilisation />
			</main>
		</>
	);
}
