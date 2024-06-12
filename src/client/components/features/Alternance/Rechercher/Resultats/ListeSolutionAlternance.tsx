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
	const getLogo = (alternance: ResultatRechercheAlternance.Offre) => {
		if (alternance.source === Alternance.Source.MATCHA) {
			return '/images/logos/la-bonne-alternance.svg';
		}
		return '/images/logos/france-travail.svg';
	};

	const getAlternativeTextuelle = (alternance: ResultatRechercheAlternance.Offre) => {
		if (isMatcha(alternance.source)) {
			return 'la bonne alternance';
		}
		return 'france travail';
	};

	function getTags(alternance: ResultatRechercheAlternance.Offre) {
		const tags = [];
		if (alternance.localisation) tags.push(alternance.localisation);

		if (alternance.source === Alternance.Source.FRANCE_TRAVAIL) {
			tags.push(Alternance.Contrat.ALTERNANCE);
			if (alternance.typeDeContrat && alternance.typeDeContrat.length > 0) tags.push(...alternance.typeDeContrat);
			return tags;
		}

		if (alternance.typeDeContrat && alternance.typeDeContrat.length > 0) tags.push(...alternance.typeDeContrat);
		if (alternance.niveauRequis) tags.push(alternance.niveauRequis);
		return tags;
	}

	return (
		<>
			<ListeRésultatsRechercherSolution aria-label="Offres d’alternances">
				{alternanceList.map((alternance) => (
					<li key={alternance.id}>
						<RésultatRechercherSolution
							lienOffre={`/apprentissage/${alternance.id}`}
							intituléOffre={alternance.titre}
							logo={getLogo(alternance)}
							étiquetteOffreList={getTags(alternance)}
							sousTitreOffre={alternance.entreprise.nom}
							logoAlt={getAlternativeTextuelle(alternance)}
						/>
					</li>
				))}
			</ListeRésultatsRechercherSolution>
		</>
	);
}
