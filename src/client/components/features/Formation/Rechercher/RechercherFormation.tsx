import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FormulaireRechercherFormation } from '~/client/components/features/Formation/FormulaireRecherche/FormulaireRechercherFormation';
import {
	RésultatRechercherFormation,
} from '~/client/components/features/Formation/Résultat/RésultatRechercherFormation';
import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { FormationService } from '~/client/services/formation/formation.service';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { transformObjectToQueryString } from '~/server/services/utils/urlParams.util';

const PREFIX_TITRE_PAGE = 'Rechercher une formation en apprentissage';

export default function RechercherFormation() {
	const router = useRouter();

	const formationService = useDependency<FormationService>('formationService');
	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [formationList, setFormationList] = useState<RésultatRechercheFormation[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [nombreRésultats, setNombreRésultats] = useState(0);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);

	useEffect(() => {
		const queryString = stringify(router.query);

		if (queryString !== '') {
			setIsLoading(true);
			setErreurRecherche(undefined);

			formationService.rechercherFormation(queryString)
				.then((response) => {
					if (response.instance === 'success') {
						setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.length === 0 ? ' - Aucun résultat' : ''}`));
						setFormationList(response.result);
						setNombreRésultats(response.result.length);
					} else {
						setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
						setErreurRecherche(response.errorType);
					}
					setIsLoading(false);
				});
		}
	}, [router.query, formationService]);

	const messageRésultatRecherche: string = useMemo(() => {
		const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
		if (nombreRésultats > 1) {
			messageRésultatRechercheSplit.push('formations en alternance');
		} else if (nombreRésultats === 1) {
			messageRésultatRechercheSplit.push('formation en alternance');
		} else {
			return '';
		}
		if (router.query.libelleMetier) {
			messageRésultatRechercheSplit.push(`pour ${router.query.libelleMetier}`);
		}
		return messageRésultatRechercheSplit.join(' ');
	}, [nombreRésultats, router.query.libelleMetier]);

	return  <>
		<Head
			title={title}
			robots="index,follow"
		/>
		<main id="contenu">
			<RechercherSolutionLayout
				bannière={<BannièreFormation/>}
				erreurRecherche={erreurRecherche}
				formulaireRecherche={<FormulaireRechercherFormation/>}
				isLoading={isLoading}
				messageRésultatRecherche={messageRésultatRecherche}
				nombreSolutions={formationList.length}
				listeSolutionElement={
					<ListeFormation
						résultatList={formationList}
						queryParams={transformObjectToQueryString({
							...router.query,
							libelleCommune: undefined,
							libelleMetier: undefined,
						})}
					/>
				}
			/>
		</main>
	</>;
}

function BannièreFormation() {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>Des milliers de formations en alternance</LightHeroPrimaryText>
			</h1>
			<LightHeroSecondaryText>pour vous permettre de réaliser votre projet professionnel</LightHeroSecondaryText>
		</LightHero>
	);
}

interface ListeRésultatProps {
	résultatList: RésultatRechercheFormation[]
	queryParams: string
}

function ListeFormation({ résultatList, queryParams }: ListeRésultatProps) {
	if (!résultatList.length) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label="Formations en alternance">
			{résultatList.map((formation) => (
				<li key={uuidv4()}>
					<RésultatRechercherFormation
						lienOffre={getLienOffre(formation, queryParams)}
						intituléOffre={formation.titre}
						logoEntreprise={'/images/logos/fallback.svg'}
						étiquetteOffreList={formation.tags as string[]}
						nomEntreprise={formation.nomEntreprise}
						adresse={formation.adresse}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}

function getLienOffre(formation: RésultatRechercheFormation, queryParams: string) {
	return `/formations/apprentissage/${encodeURIComponent(formation.idRco)}?${queryParams}`;
}
