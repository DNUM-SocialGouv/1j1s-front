import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import {
	formatLibelleLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/formatLibelleLocalisation';
import { getCodeLibelleLocalisation } from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/getCodeLibelleLocalisation';
import {
	LightHero,
	LightHeroPrimaryText,
	LightHeroSecondaryText,
} from '~/client/components/ui/Hero/LightHero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import empty from '~/client/utils/empty';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { 	MAX_PAGE_ALLOWED_BY_FRANCE_TRAVAIL,
	NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE,
	Offre,
	RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';

// NOTE (BRUJ 06/05/2024): Pour éviter les hydratation mismatch lié au usebreakpoint on désactive le srr sur des composants spécifiques cf https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const ResultatRechercherSolution = dynamic(() => import('~/client/components/layouts/RechercherSolution/Resultat/ResultatRechercherSolution').then((mod) => mod.ResultatRechercherSolution), { ssr: false });
const LOGO_FRANCE_TRAVAIL = '/images/logos/france-travail.svg';

interface CarteOffreEmploiProps {
  type: 'jobEtudiant' | 'jobEte' | 'emplois'
  erreurRecherche?: Erreur
	resultats?: RésultatsRechercheOffre
  prefixTitrePage: string
  FormulaireDeRechercheComposant: React.JSX.Element
  headDescription: string
  premierTexteBanniere: string
	ariaLabelListeOffres: string
}

export function CarteOffreEmploi(props: CarteOffreEmploiProps) {
	const offreEmploiQuery = useOffreQuery();

	const title = formatRechercherSolutionDocumentTitle(`${props.prefixTitrePage}${props.resultats?.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`);
	const jobList = props.resultats?.résultats || [];
	const nombreResultats = props.resultats?.nombreRésultats || 0;
	const erreurRecherche = props.erreurRecherche;

	const messageResultatRecherche: string = useMemo(() => {
		const messageResultatRechercheSplit: string[] = [`${nombreResultats}`];
		if (nombreResultats > 1) {
			messageResultatRechercheSplit.push(props.type === 'emplois' ? 'offres d’emplois' : `offres de ${props.type === 'jobEtudiant' ? 'jobs étudiants' : 'jobs d’été'}`);
		} else if (nombreResultats == 1) {
			messageResultatRechercheSplit.push(props.type === 'emplois' ? 'offre d’emploi' : `offre de ${props.type === 'jobEtudiant' ? 'job étudiant' : 'job d’été'}`);
		}
		else {
			messageResultatRechercheSplit.push('');
		}
		if (offreEmploiQuery.motCle) {
			messageResultatRechercheSplit.push(`pour ${offreEmploiQuery.motCle}`);
		}
		return messageResultatRechercheSplit.join(' ');
	}, [nombreResultats, offreEmploiQuery.motCle, props.type]);

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
				description={props.headDescription}
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					banniere={<BanniereJob primaryText={props.premierTexteBanniere} />}
					erreurRecherche={erreurRecherche}
					etiquettesRecherche={etiquettesRecherche}
					formulaireRecherche={props.FormulaireDeRechercheComposant}
					isChargement={false}
					isEtatInitial={empty(offreEmploiQuery)}
					messageResultatRecherche={messageResultatRecherche}
					nombreTotalSolutions={nombreResultats}
					paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
					maxPage={MAX_PAGE_ALLOWED_BY_FRANCE_TRAVAIL - 1}
					listeSolutionElement={<ListeOffreJob resultatList={jobList} type={props.type} ariaLabel={props.ariaLabelListeOffres}/>}
				/>
			</main>
		</>
	);
}

interface ListeResultatProps {
	resultatList: Offre[]
  type: 'jobEtudiant' | 'jobEte' | 'emploisEurope';
  ariaLabel: string
}

function ListeOffreJob({ resultatList, ariaLabel }: ListeResultatProps) {
	if (!resultatList) {
		return undefined;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label={ariaLabel}>
			{resultatList.map((offreEmploi: Offre) => (
				<li key={offreEmploi.id}>
					<ResultatRechercherSolution
						étiquetteOffreList={offreEmploi.étiquetteList}
						intituléOffre={offreEmploi.intitulé}
						lienOffre={`/jobs-ete/${offreEmploi.id}`}
						logo={offreEmploi.entreprise.logo || LOGO_FRANCE_TRAVAIL}
						logoAlt={offreEmploi.entreprise.logo ? '' : 'France travail'}
						sousTitreOffre={offreEmploi.entreprise.nom}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}

interface BanniereJobProps {
  primaryText: string
}

function BanniereJob(props: BanniereJobProps) {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>{props.primaryText}</LightHeroPrimaryText>
				<LightHeroSecondaryText>sélectionnés pour vous par France Travail</LightHeroSecondaryText>
			</h1>
		</LightHero>
	);
}

