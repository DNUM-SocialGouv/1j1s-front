import React, { useMemo } from 'react';

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
	formatLibelleLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/formatLibelleLocalisation';
import {
	getCodeLibelleLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/getCodeLibelleLocalisation';
import {
	LightHero,
	LightHeroPrimaryText,
	LightHeroSecondaryText,
} from '~/client/components/ui/Hero/LightHero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import {
	MAX_PAGE_ALLOWED_BY_POLE_EMPLOI,
	NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE,
	Offre,
	RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';

const PREFIX_TITRE_PAGE = 'Rechercher un job d’été';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

interface RechercherJobEteProps {
	erreurRecherche?: Erreur
	resultats?: RésultatsRechercheOffre
}

export function RechercherJobEte(props: RechercherJobEteProps) {
	const offreEmploiQuery = useOffreQuery();

	const title = formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${props.resultats?.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`);
	const jobEteList = props.resultats?.résultats || [];
	const nombreResultats = props.resultats?.nombreRésultats || 0;
	const erreurRecherche = props.erreurRecherche;

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
		if (offreEmploiQuery.nomLocalisation) {
			return <TagList list={[
				formatLibelleLocalisation(
					offreEmploiQuery.nomLocalisation,
					getCodeLibelleLocalisation(offreEmploiQuery.codeLocalisation, offreEmploiQuery.codePostalLocalisation, offreEmploiQuery.typeLocalisation) || '',
				),
			]} aria-label="Filtres de la recherche"/>;
		} else {
			return undefined;
		}
	}, [offreEmploiQuery.codeLocalisation, offreEmploiQuery.codePostalLocalisation, offreEmploiQuery.nomLocalisation, offreEmploiQuery.typeLocalisation]);

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
					isLoading={false}
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
