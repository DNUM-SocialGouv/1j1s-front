import React, { useEffect, useMemo, useState } from 'react';

import {
	FormulaireRechercheJobÉtudiant,
} from '~/client/components/features/JobÉtudiant/FormulaireRecherche/FormulaireRechercheJobÉtudiant';
import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { LaBonneBoitePartner } from '~/client/components/features/Partner/LaBonneBoitePartner';
import { OnisepPartner } from '~/client/components/features/Partner/OnisepPartner';
import { ServiceCiviquePartner } from '~/client/components/features/Partner/ServiceCiviquePartner';
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

const PREFIX_TITRE_PAGE = 'Rechercher un job étudiant';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherJobÉtudiant() {
	const offreEmploiQuery = useOffreQuery();
	const offreService = useDependency<OffreService>('offreService');

	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [jobÉtudiantList, setJobÉtudiantList] = useState<Offre[]>([]);
	const [nombreRésultats, setNombreRésultats] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);

	useEffect(() => {
		setIsLoading(true);
		setErreurRecherche(undefined);
		offreService.rechercherJobÉtudiant(offreEmploiQuery)
			.then((response) => {
				if (response.instance === 'success') {
					setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
					setJobÉtudiantList(response.result.résultats);
					setNombreRésultats(response.result.nombreRésultats);
				} else {
					setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
					setErreurRecherche(response.errorType);
				}
				setIsLoading(false);
			});
	}, [offreEmploiQuery, offreService]);

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
				description="Des milliers de jobs étudiants sélectionnés pour vous"
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={<BannièreJobÉtudiant/>}
					erreurRecherche={erreurRecherche}
					étiquettesRecherche={étiquettesRecherche}
					formulaireRecherche={<FormulaireRechercheJobÉtudiant/>}
					isLoading={isLoading}
					messageRésultatRecherche={messageRésultatRecherche}
					nombreSolutions={nombreRésultats}
					paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
					maxPage={MAX_PAGE_ALLOWED_BY_POLE_EMPLOI - 1}
					listeSolutionElement={<ListeOffreJobÉtudiant résultatList={jobÉtudiantList}/>}
				/>
				<EnTete heading="Découvrez des services faits pour vous" />
				<PartnerCardList>
					<LaBonneBoitePartner />
					<OnisepPartner />
					<ServiceCiviquePartner />
				</PartnerCardList>
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
