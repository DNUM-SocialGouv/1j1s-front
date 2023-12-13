import { useEffect, useMemo, useState } from 'react';

import { BanniereEmploisEurope } from '~/client/components/features/EmploisEurope/BanniereEmploisEurope';
import {
	FormulaireRechercheEmploisEurope,
} from '~/client/components/features/EmploisEurope/FormulaireRecherche/FormulaireRechercheEmploisEurope';
import {
	ListeResultatsEmploiEurope,
} from '~/client/components/features/EmploisEurope/FormulaireRecherche/ListeResultatsEmploiEurope';
import { Head } from '~/client/components/head/Head';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { EmploiEuropeService } from '~/client/services/europe/emploiEurope.service';
import empty from '~/client/utils/empty';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import {
	NOMBRE_RESULTATS_EMPLOIS_EUROPE_PAR_PAGE,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';
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
		const messageResultatRechercheSplit: string[] = [`${nombreResultats}`];
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

	const etiquettesRecherche = useMemo(() => {
		const filtreList: string[] = [];
		if (emploiEuropeQuery.libellePays) {
			filtreList.push(emploiEuropeQuery.libellePays);
		}
		if (emploiEuropeQuery.typeContrat) {
			const typeContratList = emploiEuropeQuery.typeContrat.split(',');
			const typeContratLibelleList = typeContratList
				.filter((typeContrat) => typesContratEures.find((typeContratEures) => typeContratEures.valeur === typeContrat)?.libellé)
				.map((typeContrat) => typesContratEures.find((typeContratEures) => typeContratEures.valeur === typeContrat)!.libellé);
			filtreList.push(...typeContratLibelleList);
		}
		return <TagList list={filtreList} aria-label="Filtres de la recherche" />;
	}, [emploiEuropeQuery.typeContrat, emploiEuropeQuery.libellePays]);

	return <>
		<Head
			title="Rechercher un emploi en Europe | 1jeune1solution"
			description="Des milliers d’offres d’emplois en Europe sélectionnées pour vous par EURES"
			robots="index,follow"
		/>
		<main id="contenu">
			<RechercherSolutionLayout
				bannière={<BanniereEmploisEurope/>}
				erreurRecherche={erreurRecherche}
				étiquettesRecherche={etiquettesRecherche}
				formulaireRecherche={<FormulaireRechercheEmploisEurope/>}
				isLoading={isLoading}
				nombreSolutions={nombreResultats}
				paginationOffset={NOMBRE_RESULTATS_EMPLOIS_EUROPE_PAR_PAGE}
				listeSolutionElement={<ListeResultatsEmploiEurope resultatList={emploiEuropeList}/>}
				messageRésultatRecherche={messageResultatRecherche}
			/>
		</main>
	</>;
}
