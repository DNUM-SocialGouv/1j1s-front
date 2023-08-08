import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { BanniereApprentissage } from '~/client/components/features/Alternance/Rechercher/BanniereApprentissage';
import {
	FormulaireRechercheAlternance,
} from '~/client/components/features/Alternance/Rechercher/FormulaireRecherche/FormulaireRechercheAlternance';
import {
	ListeSolutionAlternance,
} from '~/client/components/features/Alternance/Rechercher/Resultats/ListeSolutionAlternance';
import {
	ListeSolutionAlternanceEntreprise,
} from '~/client/components/features/Alternance/Rechercher/Resultats/ListeSolutionAlternanceEntreprise';
import { ServiceCardList } from '~/client/components/features/ServiceCard/Card/ServiceCard';
import { DecouvrirApprentissage } from '~/client/components/features/ServiceCard/DecouvrirApprentissage';
import { OnisepMetierPartner } from '~/client/components/features/ServiceCard/OnisepMetierPartner';
import { PassPartner } from '~/client/components/features/ServiceCard/PassPartner';
import { Head } from '~/client/components/head/Head';
import {
	RechercherSolutionLayoutWithTabs,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayoutWithTabs';
import { ArticleCard, ArticleCardList } from '~/client/components/ui/Card/Article/ArticleCard';
import { EnTete } from '~/client/components/ui/EnTete/EnTete';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import { AlternanceService } from '~/client/services/alternance/alternance.service';
import empty from '~/client/utils/empty';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Erreur } from '~/server/errors/erreur.types';

const PREFIX_TITRE_PAGE = 'Rechercher une alternance';

export default function RechercherAlternance() {
	const router = useRouter();
	const isCampagneApprentissageActive = process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1';

	const alternanceQuery = useAlternanceQuery();

	const alternanceService = useDependency<AlternanceService>('alternanceService');
	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [alternanceList, setAlternanceList] = useState<ResultatRechercheAlternance>({
		entrepriseList: [],
		offreList: [],
	});
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);

	useEffect(() => {
		if (!empty(alternanceQuery)) {
			setIsLoading(true);
			setErreurRecherche(undefined);

			alternanceService.rechercherAlternance(alternanceQuery)
				.then((response) => {
					if (response.instance === 'success') {
						const numberResult = response.result.offreList.length + response.result.entrepriseList.length;
						setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${numberResult === 0 ? ' - Aucun résultat' : ''}`));
						setAlternanceList(response.result);
					} else {
						setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
						setErreurRecherche(response.errorType);
					}
					setIsLoading(false);
				});
		}
	}, [alternanceQuery, alternanceService]);


	function getMessageResultatRecherche(nombreResultats: number) {
		const messageResultatRechercheSplit: string[] = [`${nombreResultats}`];
		if (nombreResultats > 1) {
			messageResultatRechercheSplit.push('résultats');
		} else if (nombreResultats === 1) {
			messageResultatRechercheSplit.push('résultat');
		} else {
			return '';
		}
		if (router.query.libelleMetier) {
			messageResultatRechercheSplit.push(`pour ${router.query.libelleMetier}`);
		}
		return messageResultatRechercheSplit.join(' ');
	}

	const étiquettesRecherche = useMemo(() => {
		if (router.query.libelleCommune) {
			return <TagList list={[router.query.libelleCommune as string]} aria-label="Filtres de la recherche"/>;
		} else {
			return undefined;
		}
	}, [router.query.libelleCommune]);

	return <>
		<Head
			title={title}
			description="Des milliers d’alternances sélectionnées pour vous"
			robots="index,follow"
		/>
		<main id="contenu">
			<RechercherSolutionLayoutWithTabs
				bannière={<BanniereApprentissage/>}
				erreurRecherche={erreurRecherche}
				étiquettesRecherche={étiquettesRecherche}
				formulaireRecherche={<FormulaireRechercheAlternance/>}
				isLoading={isLoading}
				nombreSolutions={alternanceList.offreList.length + alternanceList.entrepriseList.length}
				listeSolutionElementTab={[{
					label: 'Contrats d‘alternance',
					listeSolutionElement: <ListeSolutionAlternance alternanceList={alternanceList.offreList}/>,
					messageResultatRecherche: getMessageResultatRecherche(alternanceList.offreList.length),
				},
				{
					label: 'Entreprises',
					listeSolutionElement: <ListeSolutionAlternanceEntreprise
						entrepriseList={alternanceList.entrepriseList}/>,
					messageResultatRecherche: getMessageResultatRecherche(alternanceList.entrepriseList.length),
				}]}
			/>
			<EnTete heading="Consultez nos articles"/>
			<ArticleCardList>
				<ArticleCard
					vertical={false}
					imageSrc="/images/articles/aide-exceptionnelle-apprentissage.svg"
					imageFit="cover"
					link="/articles/l-aide-a-l-apprentissage-l-atout-qu-il-faut-pour-vos-candidatures"
					titleLabel="Une aide exceptionnelle pour l’apprentissage : l’atout qu’il vous faut pour vos candidatures !"
					titleHeadingTag={'h3'}
				>
					<p>
						Découvrez un argument supplémentaire à avancer pour vous faire
						embaucher
					</p>
				</ArticleCard>
			</ArticleCardList>
			<EnTete heading="Découvrez des services faits pour vous"/>
			<ServiceCardList>
				{isCampagneApprentissageActive && <DecouvrirApprentissage/>}
				<PassPartner/>
				<OnisepMetierPartner/>
			</ServiceCardList>
		</main>
	</>;
}


