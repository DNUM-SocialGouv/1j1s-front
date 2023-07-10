import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
	FormulaireRechercheFormationInitiale,
} from '~/client/components/features/FormationInitiale/FormulaireRecherche/FormulaireRechercheFormationInitiale';
import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useFormationInitialeQuery } from '~/client/hooks/useFormationInitialeQuery';
import { FormationInitialeService } from '~/client/services/formationInitiale/formationInitiale.service';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

const PREFIX_TITRE_PAGE = 'Rechercher une formation initiale';

export function RechercherFormationInitiale() {
	const router = useRouter();

	const formationInitialeService = useDependency<FormationInitialeService>('formationInitialeService');
	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const [resultatList, setResultatList] = useState<FormationInitiale[]>([]);

	const formationInitialeQuery = useFormationInitialeQuery();

	useEffect(() => {
		setIsLoading(true);
		setErreurRecherche(undefined);

		formationInitialeService.rechercherFormationInitiale(formationInitialeQuery)
			.then((response) => {
				if (response.instance === 'success') {
					setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.length === 0 ? ' - Aucun résultat' : ''}`));
					setResultatList(response.result);
				} else {
					setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
					setErreurRecherche(response.errorType);
				}
				setIsLoading(false);
			});
	}, [formationInitialeService, formationInitialeQuery]);

	function getMessageResultatTrouve() {
		const formationName = router.query.motCle === undefined ? '' : `pour ${router.query.motCle}`;
		return `${resultatList.length} formation${resultatList.length > 1 ? 's' : ''} ${formationName}`;
	}

	const messageResultatRecherche =
		resultatList.length > 0 ? getMessageResultatTrouve(): '';

	return (
		<>
			<Head
				title={title}
				description="Des milliers de formations pour vous permettre de réaliser votre projet professionnel"
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={banniere()}
					erreurRecherche={erreurRecherche}
					formulaireRecherche={<FormulaireRechercheFormationInitiale/>}
					isLoading={isLoading}
					messageRésultatRecherche={messageResultatRecherche}
					nombreSolutions={resultatList.length}
					listeSolutionElement={<ListeFormationInitiale resultatList={resultatList}/>}
				/>
			</main>
		</>
	);
}


function banniere() {
	return (<LightHero>
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

	function getLienOffre(identifiant?: string){
		return identifiant ? `/formations-initiales/${encodeURIComponent(identifiant)}` : undefined;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label="Formations Initiales">
			{resultatList.map((formation: FormationInitiale) => (
				<li key={formation.libelle}>
					<RésultatRechercherSolution
						étiquetteOffreList={formation.tags}
						intituléOffre={formation.libelle}
						logo={'/images/logos/fallback.svg'}
						lienOffre={getLienOffre(formation.identifiant)}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}

