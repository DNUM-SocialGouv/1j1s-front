import React from 'react';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { Mission } from '~/server/engagement/domain/engagement';

interface ListeMissionsProps {
	resultatList: Mission[];
	isServiceCivique: boolean;
}

export function ListeMissions({ resultatList, isServiceCivique }: ListeMissionsProps) {
	if (!resultatList.length) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution
			aria-label={isServiceCivique ? 'Offre pour le service civique' : 'Offre pour le bénévolat'}>
			{resultatList.map((mission: Mission) => (
				<li key={mission.id}>
					<RésultatRechercherSolution
						intituléOffre={mission.titre}
						sousTitreOffre={mission.nomEntreprise}
						lienOffre={isServiceCivique ? `/service-civique/${mission.id}` : `/benevolat/${mission.id}`}
						logo={isServiceCivique ? '/images/logos/service-civique.svg' : '/images/logos/je-veux-aider.svg'}
						étiquetteOffreList={mission.étiquetteList}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}
