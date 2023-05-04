import React, { useEffect, useMemo, useState } from 'react';

import {
	FormulaireRechercheJobEte,
} from '~/client/components/features/JobEte/FormulaireRecherche/FormulaireRechercheJobEte';
import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import {
	LightHero,
	LightHeroPrimaryText,
	LightHeroSecondaryText,
} from '~/client/components/ui/Hero/LightHero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { OffreService } from '~/client/services/offre/offre.service';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { MAX_PAGE_ALLOWED_BY_POLE_EMPLOI, NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE, Offre } from '~/server/offres/domain/offre';

const PREFIX_TITRE_PAGE = 'Rechercher un job d’été';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherJobEte() {
	const offreEmploiQuery = useOffreQuery();
	const offreService = useDependency<OffreService>('offreService');

	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [jobEteList, setJobEteList] = useState<Offre[]>([]);
	const [nombreResultats, setNombreResultats] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);

	useEffect(() => {
		setIsLoading(true);
		setErreurRecherche(undefined);
		offreService.rechercherJobEte(offreEmploiQuery)
			.then((response) => {
				if (response.instance === 'success') {
					setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
					setJobEteList(response.result.résultats);
					setNombreResultats(response.result.nombreRésultats);
				} else {
					setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
					setErreurRecherche(response.errorType);
				}
				setIsLoading(false);
			});
	}, [offreEmploiQuery, offreService]);

	const messageResultatRecherche: string = useMemo(() => {
		const messageResultatRechercheSplit: string[] = [`${nombreResultats}`];
		if (nombreResultats > 1) {
			messageResultatRechercheSplit.push('offres de jobs d’été');
		} else {
			messageResultatRechercheSplit.push('offre de job d’été');
		}
		if (offreEmploiQuery.motCle) {
			messageResultatRechercheSplit.push(`pour ${offreEmploiQuery.motCle}`);
		}
		return messageResultatRechercheSplit.join(' ');
	}, [nombreResultats, offreEmploiQuery.motCle]);

	const etiquettesRecherche = useMemo(() => {
		if (offreEmploiQuery.libelleLocalisation) {
			return <TagList list={[offreEmploiQuery.libelleLocalisation]} aria-label="Filtres de la recherche"/>;
		} else {
			return undefined;
		}
	}, [offreEmploiQuery.libelleLocalisation]);

	return (
		<>
			<Head
				title={title}
				description="Des milliers de jobs d’été sélectionnés pour vous"
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={<BanniereJobEte/>}
					erreurRecherche={erreurRecherche}
					étiquettesRecherche={etiquettesRecherche}
					formulaireRecherche={<FormulaireRechercheJobEte/>}
					isLoading={isLoading}
					messageRésultatRecherche={messageResultatRecherche}
					nombreSolutions={nombreResultats}
					paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
					maxPage={MAX_PAGE_ALLOWED_BY_POLE_EMPLOI - 1}
					listeSolutionElement={<ListeOffreJobEte resultatList={jobEteList}/>}
				/>
			</main>
		</>
	);
}

interface ListeResultatProps {
	resultatList: Offre[]
}

function ListeOffreJobEte({ resultatList }: ListeResultatProps) {
	if (!resultatList) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label="Offres de jobs d’été">
			{resultatList.map((offreEmploi: Offre) => (
				<li key={offreEmploi.id}>
					<RésultatRechercherSolution
						étiquetteOffreList={offreEmploi.étiquetteList}
						intituléOffre={offreEmploi.intitulé}
						lienOffre={`/jobs-ete/${offreEmploi.id}`}
						logo={offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI}
						sousTitreOffre={offreEmploi.entreprise.nom}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}

function BanniereJobEte() {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>Des milliers de jobs d’été</LightHeroPrimaryText>
				<LightHeroSecondaryText>sélectionnés pour vous par Pôle Emploi</LightHeroSecondaryText>
			</h1>
		</LightHero>
	);
}
