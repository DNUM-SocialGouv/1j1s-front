import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import {
	FormulaireRechercheAlternance,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance';
import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { OnisepPartner } from '~/client/components/features/Partner/OnisepPartner';
import { PassPartner } from '~/client/components/features/Partner/PassPartner';
import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import {
	RechercherSolutionLayoutWithTabs,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayoutWithTabs';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ArticleCard, ArticleCardList } from '~/client/components/ui/Card/Article/ArticleCard';
import { EnTete } from '~/client/components/ui/EnTete/EnTete';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import { AlternanceService } from '~/client/services/alternance/alternance.service';
import empty from '~/client/utils/empty';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Alternance, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Erreur } from '~/server/errors/erreur.types';

const PREFIX_TITRE_PAGE = 'Rechercher une alternance';

export default function RechercherAlternance() {
	const router = useRouter();

	const alternanceQuery = useAlternanceQuery();

	const alternanceService = useDependency<AlternanceService>('alternanceService');
	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [alternanceList, setAlternanceList] = useState<RésultatRechercheAlternance>({
		entrepriseList: [],
		offreList: [],
	});
	const [isLoading, setIsLoading] = useState(false);
	const [nombreRésultats, setNombreRésultats] = useState(0);
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
						setNombreRésultats(numberResult);
					} else {
						setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
						setErreurRecherche(response.errorType);
					}
					setIsLoading(false);
				});
		}
	}, [alternanceQuery, alternanceService]);

	const messageRésultatRecherche: string = useMemo(() => {
		const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
		if (nombreRésultats > 1) {
			messageRésultatRechercheSplit.push('résultats');
		} else if (nombreRésultats === 1) {
			messageRésultatRechercheSplit.push('résultat');
		} else {
			return '';
		}
		if (router.query.libelleMetier) {
			messageRésultatRechercheSplit.push(`pour ${router.query.libelleMetier}`);
		}
		return messageRésultatRechercheSplit.join(' ');
	}, [nombreRésultats, router.query.libelleMetier]);

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
				bannière={<BannièreApprentissage/>}
				erreurRecherche={erreurRecherche}
				étiquettesRecherche={étiquettesRecherche}
				formulaireRecherche={<FormulaireRechercheAlternance/>}
				isLoading={isLoading}
				messageRésultatRecherche={messageRésultatRecherche}
				nombreSolutions={alternanceList.offreList.length + alternanceList.entrepriseList.length}
				listeSolutionElementTab={[{
					label: 'Contrats d‘alternance',
					listeSolutionElement: <ListeSolutionAlternance alternanceList={alternanceList.offreList}/>,
				}, 
				{
					label: 'Entreprises',
					listeSolutionElement: <ListeSolutionAlternanceEntreprise entrepriseList={alternanceList.entrepriseList}></ListeSolutionAlternanceEntreprise>,
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
				>
					<p>
						Découvrez un argument supplémentaire à avancer pour vous faire
						embaucher
					</p>
				</ArticleCard>
			</ArticleCardList>
			<EnTete heading="Découvrez des services faits pour vous"/>
			<PartnerCardList>
				<PassPartner/>
				<OnisepPartner/>
			</PartnerCardList>
		</main>
	</>;
}

function BannièreApprentissage() {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>Avec La bonne alternance, trouvez l’entreprise qu’il vous faut</LightHeroPrimaryText>
			</h1>
			<LightHeroSecondaryText>pour réaliser votre projet d’alternance</LightHeroSecondaryText>
		</LightHero>
	);
}


function ListeSolutionAlternanceEntreprise({ entrepriseList }: { entrepriseList: Array<RésultatRechercheAlternance.Entreprise> }): React.ReactElement {
	return (
		<>
			<ListeRésultatsRechercherSolution aria-label="Entreprises">
				{entrepriseList.map((entreprise, index) => (
					<li key={`${entreprise.id}-${index}`}>
						<RésultatRechercherSolution
							lienOffre={entreprise.candidaturePossible ? `/apprentissage/entreprise/${entreprise.id}` : undefined}
							logo={'/images/logos/fallback.svg'}
							intituléOffre={entreprise.nom}
							intituléLienOffre={'Candidater'}
							étiquetteOffreList={entreprise.tags}
						>
							<ul>
								{entreprise.secteurs && entreprise.secteurs.length > 0 && <li>{entreprise.secteurs.join(', ')}</li>}
								{entreprise.adresse && <li>{entreprise.adresse}</li>}
							</ul>
						</RésultatRechercherSolution>
					</li>
				))}
			</ListeRésultatsRechercherSolution>
		</>
	);
}

function ListeSolutionAlternance({ alternanceList } : { alternanceList:  Array<RésultatRechercheAlternance.Offre>}): React.ReactElement {
	const getLogo = (alternance: Alternance) => {
		if (alternance.source === Alternance.Source.MATCHA) {
			return '/images/logos/la-bonne-alternance.svg';
		}
		return '/images/logos/pole-emploi.svg';
	};

	return (
		<>
			<ListeRésultatsRechercherSolution aria-label="Offres d’alternances">
				{alternanceList.map((alternance) => (
					<li key={alternance.id}>
						<RésultatRechercherSolution
							lienOffre={`/apprentissage/${alternance.id}`}
							intituléOffre={alternance.titre}
							logo={getLogo(alternance)}
							étiquetteOffreList={alternance.tags}
							sousTitreOffre={alternance.entreprise.nom}
						/>
					</li>
				))}
			</ListeRésultatsRechercherSolution>
		</>
	);
}

