import React, { useState } from 'react';

import {
	FormulaireRechercheFormationInitiale,
} from '~/client/components/features/FormationInitiale/FormulaireRecherche/FormulaireRechercheFormationInitiale';
import { Head } from '~/client/components/head/Head';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Erreur } from '~/server/errors/erreur.types';
import { NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE } from '~/server/offres/domain/offre';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import {
	ListeRésultatsRechercherSolution
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import {
	RésultatRechercherSolution
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';

export function RechercherFormationInitiale() {
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const [resultatList, setResultatList] = useState<FormationInitiale[]>([
		{
			libelle: 'Formation numero 1!!!',
		},
		{
			libelle: 'Formation numero 2!!!',
		},
	]);

	return (
		<>
			<Head
				title="Rechercher une formation initiale | 1jeune1solution"
				description="Des milliers de formations pour vous permettre de réaliser votre projet professionnel"
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={banniere()}
					erreurRecherche={erreurRecherche}
					étiquettesRecherche={<p>TODO</p>}
					formulaireRecherche={<FormulaireRechercheFormationInitiale/>}
					isLoading={isLoading}
					messageRésultatRecherche={'TODO'}
					nombreSolutions={resultatList.length}
					paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
					listeSolutionElement={<ListeFormationInitiale resultatList={resultatList}/> }
				/>
			</main>
		</>
	);
}



function banniere(){
	return(<LightHero>
		<h1>
			<LightHeroPrimaryText>Des milliers de formations pour vous permettre</LightHeroPrimaryText>
			<LightHeroSecondaryText>de réaliser votre projet professionnel</LightHeroSecondaryText>
		</h1>
	</LightHero>);
}

interface ListResultatProps {
	resultatList: FormationInitiale[]
}

function ListeFormationInitiale({ resultatList }: ListResultatProps) {
	if (!resultatList) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label="Formations Initiales">
			{resultatList.map((formation: FormationInitiale) => (
				<li key={formation.libelle}>
					<RésultatRechercherSolution
						étiquetteOffreList={['bonjour']}
						intituléOffre={formation.libelle}
						logo={''}
						lienOffre={'http://'}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}
