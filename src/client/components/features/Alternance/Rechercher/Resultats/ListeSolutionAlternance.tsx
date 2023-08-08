import React from 'react';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { Alternance, isMatcha, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';

export function ListeSolutionAlternance({ alternanceList }: {
	alternanceList: Array<ResultatRechercheAlternance.Offre>
}): React.ReactElement {
	const getLogo = (alternance: Alternance) => {
		if (alternance.source === Alternance.Source.MATCHA) {
			return '/images/logos/la-bonne-alternance.svg';
		}
		return '/images/logos/pole-emploi.svg';
	};

	const getAlternativeTextuelle = (alternance: Alternance) => {
		if (isMatcha(alternance.source)) {
			return 'la bonne alternance';
		}
		return 'pôle emploi';
	};

	return (
		<>
			<ListeRésultatsRechercherSolution aria-label="Offres d’alternances">
				{alternanceList.map((alternance) => (
					<li key={alternance.id}>
						<RésultatRechercherSolution
							lienOffre={`/apprentissage/${alternance.id}`}
							intituléOffre={alternance.titre}
							logo={getLogo(alternance)}
							étiquetteOffreList={alternance.tags}
							sousTitreOffre={alternance.entreprise.nom}
							logoAlt={getAlternativeTextuelle(alternance)}
						/>
					</li>
				))}
			</ListeRésultatsRechercherSolution>
		</>
	);
}
