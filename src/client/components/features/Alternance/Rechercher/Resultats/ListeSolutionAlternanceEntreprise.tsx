import dynamic from 'next/dynamic';
import React from 'react';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import Entreprise = ResultatRechercheAlternance.Entreprise;

// NOTE (BRUJ 06/05/2024): Pour éviter les hydratation mismatch lié au usebreakpoint on désactive le srr sur des composants spécifiques cf https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const RésultatRechercherSolution = dynamic(() => import('~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution').then((mod) => mod.RésultatRechercherSolution), { ssr: false });


export function ListeSolutionAlternanceEntreprise({ entrepriseList }: {
	entrepriseList: Array<ResultatRechercheAlternance.Entreprise>
}): React.ReactElement {
	const getTags = (entreprise: Entreprise) => {
		const tags: Array<string> = [];
		if (entreprise.ville) tags.push(entreprise.ville);
		if (entreprise.nombreSalariés) {
			if (entreprise.nombreSalariés.min === entreprise.nombreSalariés.max && entreprise.nombreSalariés.max > 0) {
				tags.push(`${entreprise.nombreSalariés.min} salariés`);
			} else if (entreprise.nombreSalariés.min !== entreprise.nombreSalariés.max) {
				tags.push(`${entreprise.nombreSalariés.min} à ${entreprise.nombreSalariés.max} salariés`);
			}
		}
		if (entreprise.candidaturePossible) {
			tags.push('Candidature spontanée');
		} else {
			tags.push('Rencontre au sein de l’entreprise', 'Candidature sur le site de l’entreprise');
		}
		return tags;
	};

	return (
		<>
			<ListeRésultatsRechercherSolution aria-label="Entreprises">
				{entrepriseList.map((entreprise, index) => (
					<li key={`${entreprise.id}-${index}`}>
						<RésultatRechercherSolution
							lienOffre={entreprise.candidaturePossible ? `/apprentissage/entreprise/${entreprise.id}` : undefined}
							logo={'/images/logos/fallback.svg'}
							intituléOffre={entreprise.nom}
							intituléLienOffre={'Candidater'}
							étiquetteOffreList={getTags(entreprise)}
						>
							<ul>
								{entreprise.secteurs && entreprise.secteurs.length > 0 &&
									<li>{entreprise.secteurs.join(', ')}</li>}
								{entreprise.adresse && <li>{entreprise.adresse}</li>}
							</ul>
						</RésultatRechercherSolution>
					</li>
				))}
			</ListeRésultatsRechercherSolution>
		</>
	);
}
