import dynamic from 'next/dynamic';
import React from 'react';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { Alternance, isMatcha, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';

// NOTE (BRUJ 06/05/2024): Pour éviter les hydratation mismatch lié au usebreakpoint on désactive le srr sur des composants spécifiques cf https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const RésultatRechercherSolution = dynamic(() => import('~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution').then((mod) => mod.RésultatRechercherSolution), { ssr: false });

export function ListeSolutionAlternance({ alternanceList }: {
	alternanceList: Array<ResultatRechercheAlternance.Offre>
}): React.ReactElement {
	const getLogo = (alternance: Alternance) => {
		if (alternance.source === Alternance.Source.MATCHA) {
			return '/images/logos/la-bonne-alternance.svg';
		}
		return '/images/logos/france-travail.svg';
	};

	const getAlternativeTextuelle = (alternance: Alternance) => {
		if (isMatcha(alternance.source)) {
			return 'la bonne alternance';
		}
		return 'france travail';
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
