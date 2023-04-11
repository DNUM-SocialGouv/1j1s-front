import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
	FormulaireRechercherFormation,
} from '~/client/components/features/Formation/FormulaireRecherche/FormulaireRechercherFormation';
import { ÉtiquettesFiltreFormation } from '~/client/components/features/Formation/Rechercher/ÉtiquettesFiltreFormation';
import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { MétierDuSoinPartner } from '~/client/components/features/Partner/MétiersDuSoinPartner';
import { MonCompteFormationPartner } from '~/client/components/features/Partner/MonCompteFormationPartner';
import { OnisepPartner } from '~/client/components/features/Partner/OnisepPartner';
import { ParcourSupPartner } from '~/client/components/features/Partner/ParcourSupPartner';
import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { EnTete } from '~/client/components/ui/EnTete/EnTete';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useFormationQuery } from '~/client/hooks/useFormationQuery';
import { FormationService } from '~/client/services/formation/formation.service';
import empty from '~/client/utils/empty';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { transformObjectToQueryString } from '~/server/services/utils/urlParams.util';

const PREFIX_TITRE_PAGE = 'Rechercher une formation en apprentissage';

export default function RechercherFormation() {
	const router = useRouter();

	const formationQuery = useFormationQuery();
	const formationService = useDependency<FormationService>('formationService');
	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [formationList, setFormationList] = useState<RésultatRechercheFormation[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [nombreRésultats, setNombreRésultats] = useState(0);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);

	useEffect(() => {
		if (!empty(formationQuery)) {
			setIsLoading(true);
			setErreurRecherche(undefined);

			formationService.rechercherFormation(formationQuery)
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
	}, [formationQuery, formationService]);

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

	return <>
		<Head
			title={title}
			robots="index,follow"
		/>
		<main id="contenu">
			<RechercherSolutionLayout
				bannière={<BannièreFormation/>}
				erreurRecherche={erreurRecherche}
				étiquettesRecherche={<ÉtiquettesFiltreFormation/>}
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
			<EnTete heading="Découvrez des services faits pour vous"/>
			<PartnerCardList>
				<MonCompteFormationPartner/>
				<ParcourSupPartner/>
				<OnisepPartner/>
				<MétierDuSoinPartner/>
			</PartnerCardList>
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
					<RésultatRechercherSolution
						lienOffre={getLienOffre(formation, queryParams)}
						intituléOffre={formation.titre}
						logo={'/images/logos/fallback.svg'}
						étiquetteOffreList={formation.tags as string[]}
					>
						<section>
							<div>{formation.nomEntreprise && formation.nomEntreprise}</div>
							<div>Adresse : {formation.adresse && formation.adresse}</div>
						</section>
					</RésultatRechercherSolution>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}

function getLienOffre(formation: RésultatRechercheFormation, queryParams: string) {
	return `/formations/apprentissage/${encodeURIComponent(formation.id)}?${queryParams}&codeCertification=${formation.codeCertification}`;
}
