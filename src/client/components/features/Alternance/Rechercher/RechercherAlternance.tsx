import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

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
import { NoResultErrorMessage } from '~/client/components/ui/ErrorMessage/NoResultErrorMessage';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Erreur } from '~/server/errors/erreur.types';

const PREFIX_TITRE_PAGE = 'Rechercher une alternance';

export type RechercherAlternanceProps = {
	erreurRecherche?: Erreur
	resultats?: ResultatRechercheAlternance
}

export default function RechercherAlternance(props: RechercherAlternanceProps) {
	const alternanceQuery = useAlternanceQuery();
	const router = useRouter();

	const nombreResultatsEntreprises = props.resultats?.entrepriseList?.length || 0;
	const nombreResultatsOffres = props.resultats?.offreList?.length || 0;
	const nombreResultats = nombreResultatsEntreprises + nombreResultatsOffres;
	const title = formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${nombreResultats === 0 ? ' - Aucun résultat' : ''}`);
	const alternanceList = {
		entrepriseList: props.resultats?.entrepriseList || [],
		offreList: props.resultats?.offreList || [],
	};
	const erreurRecherche = props.erreurRecherche;

	function getMessageResultatRecherche(nombreResultats: number) {
		const messageResultatRechercheSplit: string[] = [`${nombreResultats}`];
		if (nombreResultats > 1) {
			messageResultatRechercheSplit.push('résultats');
		} else if (nombreResultats === 1) {
			messageResultatRechercheSplit.push('résultat');
		} else {
			return '';
		}
		if (alternanceQuery.libelleMetier) {
			messageResultatRechercheSplit.push(`pour ${alternanceQuery.libelleMetier}`);
		}
		return messageResultatRechercheSplit.join(' ');
	}

	const étiquettesRecherche = useMemo(() => {
		if (alternanceQuery.libelleCommune) {
			return <TagList list={[alternanceQuery.libelleCommune as string]} aria-label="Filtres de la recherche"/>;
		} else {
			return undefined;
		}
	}, [alternanceQuery.libelleCommune]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(false);
	}, [router]);

	function onSubmit() {
		setIsLoading(true);
	}

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
				formulaireRecherche={<FormulaireRechercheAlternance onSubmit={onSubmit}/>}
				isLoading={isLoading}
				listeSolutionElementTab={[{
					label: 'Contrats d‘alternance',
					listeSolutionElement: <ListeSolutionAlternance alternanceList={alternanceList.offreList}/>,
					messageNoResult: <NoResultErrorMessage
						explanationText="Aucun contrat d‘alternance ne correspond à votre recherche."
						solutionText="Vous pouvez consulter les entreprises ou modifier votre recherche."/>,
					messageResultatRecherche: getMessageResultatRecherche(alternanceList.offreList.length),
					nombreDeSolutions: alternanceList.offreList.length,
				},
				{
					label: 'Entreprises',
					listeSolutionElement: <ListeSolutionAlternanceEntreprise
						entrepriseList={alternanceList.entrepriseList}/>,
					messageNoResult: <NoResultErrorMessage
						explanationText="Aucune entreprise ne correspond à votre recherche."
						solutionText="Vous pouvez consulter les contrats d‘alternance ou modifier votre recherche."/>,
					messageResultatRecherche: getMessageResultatRecherche(alternanceList.entrepriseList.length),
					nombreDeSolutions: alternanceList.entrepriseList.length,
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
				<DecouvrirApprentissage/>
				<PassPartner/>
				<OnisepMetierPartner/>
			</ServiceCardList>
		</main>
	</>;
}


