import React from 'react';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';

export function ListeSolutionAlternanceEntreprise({ entrepriseList }: {
	entrepriseList: Array<ResultatRechercheAlternance.Entreprise>
}): React.ReactElement {

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
							étiquetteOffreList={entreprise.tags}
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
