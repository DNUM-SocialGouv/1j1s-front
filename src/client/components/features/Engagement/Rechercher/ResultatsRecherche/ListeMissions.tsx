import dynamic from 'next/dynamic';
import React from 'react';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { Mission } from '~/server/engagement/domain/engagement';
// NOTE (BRUJ 06/05/2024): Pour éviter les hydratation mismatch lié au usebreakpoint on désactive le srr sur des composants spécifiques cf https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const RésultatRechercherSolution = dynamic(() => import('~/client/components/layouts/RechercherSolution/Résultat/ResultatRechercherSolution').then((mod) => mod.ResultatRechercherSolution), { ssr: false });

interface ListeMissionsProps {
	resultatList: Mission[];
	isServiceCivique: boolean;
}

export function ListeMissions({ resultatList, isServiceCivique }: ListeMissionsProps) {
	if (!resultatList.length) {
		return undefined;
	}

	function getLogo(mission: Mission) {
		if (mission.logoUrl) {
			return mission.logoUrl;
		}
		if (isServiceCivique) {
			return '/images/logos/service-civique.svg';
		}
		return '/images/logos/je-veux-aider.svg';
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
						logo={getLogo(mission)}
						étiquetteOffreList={mission.étiquetteList}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}
