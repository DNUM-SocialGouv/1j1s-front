import React, { useMemo } from 'react';

import {
	FormulaireRechercheJobÉtudiant,
} from '~/client/components/features/JobÉtudiant/FormulaireRecherche/FormulaireRechercheJobÉtudiant';
import { ServiceCardList } from '~/client/components/features/ServiceCard/Card/ServiceCard';
import { LaBonneBoitePartner } from '~/client/components/features/ServiceCard/LaBonneBoitePartner';
import { OnisepMetierPartner } from '~/client/components/features/ServiceCard/OnisepMetierPartner';
import { ServiceCiviquePartner } from '~/client/components/features/ServiceCard/ServiceCiviquePartner';
import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { EnTete } from '~/client/components/ui/EnTete/EnTete';
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

const PREFIX_TITRE_PAGE = 'Rechercher un job étudiant';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

interface RechercherJobEtudiantProps {
	erreurRecherche?: Erreur
	resultats?: RésultatsRechercheOffre
}

export function RechercherJobÉtudiant(props: RechercherJobEtudiantProps) {
	const offreEmploiQuery = useOffreQuery();

	const title = formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${props.resultats?.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`);
	const jobÉtudiantList = props.resultats?.résultats || [];
	const nombreRésultats = props.resultats?.nombreRésultats || 0;
	const erreurRecherche = props.erreurRecherche;

	const messageRésultatRecherche: string = useMemo(() => {
		const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
		if (nombreRésultats > 1) {
			messageRésultatRechercheSplit.push('offres de jobs étudiants');
		} else {
			messageRésultatRechercheSplit.push('offre de job étudiant');
		}
		if (offreEmploiQuery.motCle) {
			messageRésultatRechercheSplit.push(`pour ${offreEmploiQuery.motCle}`);
		}
		return messageRésultatRechercheSplit.join(' ');
	}, [nombreRésultats, offreEmploiQuery.motCle]);

	const étiquettesRecherche = useMemo(() => {
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
				description="Des milliers de jobs étudiants sélectionnés pour vous"
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={<BannièreJobÉtudiant/>}
					erreurRecherche={erreurRecherche}
					étiquettesRecherche={étiquettesRecherche}
					formulaireRecherche={<FormulaireRechercheJobÉtudiant/>}
					isLoading={false}
					messageRésultatRecherche={messageRésultatRecherche}
					nombreSolutions={nombreRésultats}
					paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
					maxPage={MAX_PAGE_ALLOWED_BY_POLE_EMPLOI - 1}
					listeSolutionElement={<ListeOffreJobÉtudiant résultatList={jobÉtudiantList}/>}
				/>
				<EnTete heading="Découvrez des services faits pour vous" />
				<ServiceCardList>
					<LaBonneBoitePartner />
					<OnisepMetierPartner />
					<ServiceCiviquePartner />
				</ServiceCardList>
			</main>
		</>
	);
}

interface ListeRésultatProps {
  résultatList: Offre[]
}

function ListeOffreJobÉtudiant({ résultatList }: ListeRésultatProps) {
	if (!résultatList.length) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label="Offres de jobs étudiants">
			{résultatList.map((offreEmploi: Offre) => (
				<li key={offreEmploi.id}>
					<RésultatRechercherSolution
						étiquetteOffreList={offreEmploi.étiquetteList}
						intituléOffre={offreEmploi.intitulé}
						lienOffre={`/jobs-etudiants/${offreEmploi.id}`}
						logo={offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI}
						sousTitreOffre={offreEmploi.entreprise.nom}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}

function BannièreJobÉtudiant() {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>Des milliers de jobs étudiants</LightHeroPrimaryText>
				<LightHeroSecondaryText>sélectionnés pour vous par Pôle Emploi</LightHeroSecondaryText>
			</h1>
		</LightHero>
	);
}
