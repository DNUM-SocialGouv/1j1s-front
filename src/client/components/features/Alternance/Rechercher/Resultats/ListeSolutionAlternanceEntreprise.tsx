import React from 'react';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import {
	ResultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Resultat/ResultatRechercherSolution';
import { ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import Entreprise = ResultatRechercheAlternance.Entreprise;

export function ListeSolutionAlternanceEntreprise({ entrepriseList }: {
	entrepriseList: Array<ResultatRechercheAlternance.Entreprise>
}): React.ReactElement {
	const getTags = (entreprise: Entreprise) => {
		const tags: Array<string> = [];
		if (entreprise.ville) tags.push(entreprise.ville);
		if (entreprise.nombreSalariés) tags.push(entreprise.nombreSalariés);
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
						<ResultatRechercherSolution
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
						</ResultatRechercherSolution>
					</li>
				))}
			</ListeRésultatsRechercherSolution>
		</>
	);
}
