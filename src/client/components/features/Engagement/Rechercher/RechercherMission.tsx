import React, { useEffect, useMemo, useState } from 'react';

import { BanniereMission } from '~/client/components/features/Engagement/Rechercher/BanniereMission';
import {
	FormulaireRechercheMissionEngagement,
} from '~/client/components/features/Engagement/Rechercher/FormulaireRecherche/FormulaireRechercheMissionEngagement';
import {
	EtiquettesFiltreMission,
} from '~/client/components/features/Engagement/Rechercher/ResultatsRecherche/EtiquettesFiltreMission';
import { ListeMissions } from '~/client/components/features/Engagement/Rechercher/ResultatsRecherche/ListeMissions';
import {
	MessageNombreResultats,
} from '~/client/components/features/Engagement/Rechercher/ResultatsRecherche/MessageNombreResultats';
import { Head } from '~/client/components/head/Head';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { Footnote } from '~/client/components/ui/Footnote/Footnote';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import empty from '~/client/utils/empty';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { recupererLibelleDepuisValeur } from '~/client/utils/recupererLibelleDepuisValeur.utils';
import {
	bénévolatDomaineList,
	Mission,
	NOMBRE_RÉSULTATS_MISSION_PAR_PAGE,
	serviceCiviqueDomaineList,
} from '~/server/engagement/domain/engagement';
import { Erreur } from '~/server/errors/erreur.types';

interface RechercherMissionProps {
	category: EngagementCategory.BENEVOLAT | EngagementCategory.SERVICE_CIVIQUE
}

export function RechercherMission(props: RechercherMissionProps) {
	const { category } = props;
	const missionEngagementService = useDependency<MissionEngagementService>('missionEngagementService');
	const missionEngagementQuery = useMissionEngagementQuery();
	const [missionList, setMissionList] = useState<Mission[]>([]);
	const [nombreResultats, setNombreResultats] = useState(0);

	const isServiceCivique = useMemo(() => {
		return category === EngagementCategory.SERVICE_CIVIQUE;
	}, [category]);

	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);
	const [title, setTitle] = useState<string>(`Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'} | 1jeune1solution'`);

	useEffect(() => {
		if (empty(missionEngagementQuery)) {
			return;
		}

		setIsLoading(true);
		setErreurRecherche(undefined);
		missionEngagementService
			.rechercherMission(missionEngagementQuery, category)
			.then((response) => {
				if (response.instance === 'success') {
					setTitle(formatRechercherSolutionDocumentTitle(`Rechercher une mission de  ${isServiceCivique ? 'service civique' : 'bénévolat'} ${response.result.résultats.length === 0 ? ' - Aucun résultat' : ''}`));
					setMissionList(response.result.résultats);
					setNombreResultats(response.result.nombreRésultats);
				} else {
					setTitle(formatRechercherSolutionDocumentTitle(`Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'}`, response.errorType));
					setErreurRecherche(response.errorType);
				}
				setIsLoading(false);
			});
	}, [missionEngagementQuery, missionEngagementService, category, isServiceCivique]);

	const domainQuery = missionEngagementQuery?.domain;
	const domaine = domainQuery && recupererLibelleDepuisValeur(isServiceCivique ? serviceCiviqueDomaineList : bénévolatDomaineList, domainQuery);

	return (
		<>
			<Head
				title={title || `Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'} | 1jeune1solution`}
				description="Se rendre utile tout en préparant son avenir grâce aux missions de service civique"
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={<BanniereMission isServiceCivique={isServiceCivique}/>}
					erreurRecherche={erreurRecherche}
					étiquettesRecherche={<EtiquettesFiltreMission/>}
					formulaireRecherche={<FormulaireRechercheMissionEngagement domainList={isServiceCivique ? serviceCiviqueDomaineList : bénévolatDomaineList}/>}
					isLoading={isLoading}
					messageRésultatRecherche={
						<>
							<MessageNombreResultats nombreResultats={nombreResultats} isServiceCivique={isServiceCivique} domaine={domaine} />
							<Footnote.Reference to="partenaires" id="partenaires-reference" />
						</>
					}
					nombreSolutions={nombreResultats}
					paginationOffset={NOMBRE_RÉSULTATS_MISSION_PAR_PAGE}
					listeSolutionElement={<ListeMissions resultatList={missionList} isServiceCivique={isServiceCivique}/>}
					footnote={
						<Footnote htmlFor="partenaires-reference" id="partenaires" >
							les annonces listées ci-dessus nous sont fournies par nos partenaires (<a href="/cgu#3-services">liste disponible dans les <abbr title="Conditions Générales d'Utilisation">CGU</abbr></a>)
						</Footnote>
					}
				/>
			</main>
		</>
	);
}

