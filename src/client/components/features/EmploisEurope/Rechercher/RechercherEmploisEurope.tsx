import { useEffect, useMemo, useState } from 'react';

import { BanniereEmploisEurope } from '~/client/components/features/EmploisEurope/BanniereEmploisEurope';
import {
	FormulaireRechercheEmploisEurope,
} from '~/client/components/features/EmploisEurope/FormulaireRecherche/FormulaireRechercheEmploisEurope';
import {
	ListeResultatsEmploiEurope,
} from '~/client/components/features/EmploisEurope/FormulaireRecherche/ListeResultatsEmploiEurope';
import {
	EtiquettesFiltresRecherche,
} from '~/client/components/features/EmploisEurope/Rechercher/EtiquettesFiltresRecherche';
import { Head } from '~/client/components/head/Head';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { EmploiEuropeService } from '~/client/services/europe/emploiEurope.service';
import empty from '~/client/utils/empty';
import { formatNumberWithSpace } from '~/client/utils/formatNumberWithSpace';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import {
	NOMBRE_RESULTATS_EMPLOIS_EUROPE_PAR_PAGE,
	RESULTATS_EMPLOIS_EUROPE_MAX_PAGE,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { Erreur } from '~/server/errors/erreur.types';

export default function RechercherEmploisEurope() {
	const emploiEuropeQuery = useEmploiEuropeQuery();
	const emploiEuropeService = useDependency<EmploiEuropeService>('emploiEuropeService');
	const [emploiEuropeList, setEmploiEuropeList] = useState<EmploiEurope[]>([]);
	const [nombreResultats, setNombreResultats] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);

	useEffect(() => {
		if (!empty(emploiEuropeQuery)) {
			setIsLoading(true);
			setErreurRecherche(undefined);

			emploiEuropeService.rechercherEmploiEurope(emploiEuropeQuery)
				.then((response) => {
					if (response.instance === 'success') {
						setEmploiEuropeList(response.result.offreList);
						setNombreResultats(response.result.nombreResultats);
					} else {
						setErreurRecherche(response.errorType);
					}
					setIsLoading(false);
				});
		}
	}, [emploiEuropeQuery, emploiEuropeService]);

	const messageResultatRecherche: string = useMemo(() => {
		const nombreResultatsFormaté = formatNumberWithSpace(nombreResultats);

		const messageResultatRechercheSplit: string[] = [`${nombreResultatsFormaté}`];
		if (nombreResultats > 1) {
			messageResultatRechercheSplit.push('offres d’emplois en Europe');
		} else {
			messageResultatRechercheSplit.push('offre d’emploi en Europe');
		}
		if (emploiEuropeQuery.motCle) {
			messageResultatRechercheSplit.push(`pour ${emploiEuropeQuery.motCle}`);
		}
		return messageResultatRechercheSplit.join(' ');
	}, [nombreResultats, emploiEuropeQuery.motCle]);

	return <>
		<Head
			title="Rechercher un emploi en Europe | 1jeune1solution"
			description="Des milliers d’offres d’emplois en Europe sélectionnées pour vous par EURES"
			robots="index,follow"
		/>
		<main id="contenu">
			<RechercherSolutionLayout
				banniere={<BanniereEmploisEurope/>}
				erreurRecherche={erreurRecherche}
				etiquettesRecherche={<EtiquettesFiltresRecherche/>}
				formulaireRecherche={<FormulaireRechercheEmploisEurope/>}
				isChargement={isLoading}
				isEtatInitial={empty(emploiEuropeQuery)}
				nombreTotalSolutions={nombreResultats}
				paginationOffset={NOMBRE_RESULTATS_EMPLOIS_EUROPE_PAR_PAGE}
				listeSolutionElement={<ListeResultatsEmploiEurope resultatList={emploiEuropeList}/>}
				messageResultatRecherche={messageResultatRecherche}
				maxPage={RESULTATS_EMPLOIS_EUROPE_MAX_PAGE - 1}
			/>
		</main>
	</>;
}
