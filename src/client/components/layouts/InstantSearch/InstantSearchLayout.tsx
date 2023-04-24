import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import { SendEventForHits } from 'instantsearch.js/es/lib/utils/createSendEventForHits';
import { BaseHit } from 'instantsearch.js/es/types/results';
import React, { useEffect, useRef, useState } from 'react';
import { Configure, Hits, InstantSearch, useInstantSearch } from 'react-instantsearch-hooks-web';

import { Container } from '~/client/components/layouts/Container/Container';
import { InstantSearchErrorBoundary } from '~/client/components/layouts/InstantSearch/InstantSearchErrorBoundary';
import styles from '~/client/components/layouts/InstantSearch/InstantSearchLayout.module.scss';
import { ListeDesResultats } from '~/client/components/layouts/InstantSearch/ListeDesResultats';
import { Footnote } from '~/client/components/ui/Footnote/Footnote';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MessageResultatRecherche } from '~/client/components/ui/Meilisearch/MessageResultatRecherche';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

export interface HitProps<THit extends BaseHit> {
  hit: THit;
	sendEvent: SendEventForHits;
}

export type HitComponent<THit extends BaseHit> = React.JSXElementConstructor<HitProps<THit>>;

interface AfficherResultatDeRechercheProps<THit extends BaseHit> {
  nombreDeResultatParPage: number
  messageResultatRechercheLabelSingulier: string
  messageResultatRechercheLabelPluriel: string
  nombreDeSkeleton: number
  ariaLabelListeDesResultats: string
  isAffichageListeDeResultatsDesktopDirectionRow: boolean
  resultatDeRecherche: HitComponent<THit>
}

interface InstantSearchLayoutProps<THit extends BaseHit> extends AfficherResultatDeRechercheProps<THit> {
  meilisearchIndex: string
  titre: string
  sousTitre: string
  isMeilisearchQueryParamsRoutingEnabled: boolean
  formulaireDeRecherche: React.ReactElement
  tagList: React.ReactElement
}

export function InstantSearchLayout<THit extends BaseHit = BaseHit>(props: InstantSearchLayoutProps<THit>) {
	const {
		meilisearchIndex,
		nombreDeResultatParPage,
		titre,
		sousTitre,
		isMeilisearchQueryParamsRoutingEnabled,
		formulaireDeRecherche,
		tagList,
		messageResultatRechercheLabelSingulier,
		messageResultatRechercheLabelPluriel,
		nombreDeSkeleton,
		ariaLabelListeDesResultats,
		resultatDeRecherche,
		isAffichageListeDeResultatsDesktopDirectionRow,
	} = props;

	const searchClient = useDependency<SearchClient>('rechercheClientService');

	const listeDesResultatsRef = useRef<HTMLElement>(null);

	const scrollToTopOfListeDesResultats = () => {
		const sectionListeDesResultats = listeDesResultatsRef.current;
		if (sectionListeDesResultats) {
			sectionListeDesResultats.scrollIntoView(true);
		}
	};

	return (
		<main id="contenu">
			<LightHero>
				<h1>
					<LightHeroPrimaryText>{titre}</LightHeroPrimaryText>
					<LightHeroSecondaryText>{sousTitre}</LightHeroSecondaryText>
				</h1>
			</LightHero>
			<InstantSearch
				searchClient={searchClient}
				indexName={meilisearchIndex}
				routing={isMeilisearchQueryParamsRoutingEnabled}
			>
				<InstantSearchErrorBoundary>
					<>
						<Configure hitsPerPage={nombreDeResultatParPage}/>
						<section className="separator">
							<Container>
								{ formulaireDeRecherche }
							</Container>
						</section>
						<Container className={styles.TagListWrapper}>
							{tagList}
						</Container>
						<AfficherResultatDeRecherche
							messageResultatRechercheLabelSingulier={messageResultatRechercheLabelSingulier}
							messageResultatRechercheLabelPluriel={messageResultatRechercheLabelPluriel}
							nombreDeSkeleton={nombreDeSkeleton}
							ariaLabelListeDesResultats={ariaLabelListeDesResultats}
							resultatDeRecherche={resultatDeRecherche as HitComponent<THit>}
							isAffichageListeDeResultatsDesktopDirectionRow={isAffichageListeDeResultatsDesktopDirectionRow}
							nombreDeResultatParPage={nombreDeResultatParPage}
							scrollToTopOfListeDesResultats={scrollToTopOfListeDesResultats}
							ref={listeDesResultatsRef}
						/>
					</>
				</InstantSearchErrorBoundary>
			</InstantSearch>
		</main>
	);
}

type AfficherResultatDeRechercheWithScrollProps<THit extends BaseHit = BaseHit> = AfficherResultatDeRechercheProps<THit> & { scrollToTopOfListeDesResultats: () => void };

const AfficherResultatDeRecherche = React.forwardRef(function AfficherResultatDeRecherche<THit extends BaseHit>(props: AfficherResultatDeRechercheWithScrollProps<THit>, outerRef: React.Ref<HTMLElement> | null) {
	const {
		messageResultatRechercheLabelSingulier,
		messageResultatRechercheLabelPluriel,
		nombreDeSkeleton,
		ariaLabelListeDesResultats,
		resultatDeRecherche,
		isAffichageListeDeResultatsDesktopDirectionRow,
		nombreDeResultatParPage,
		scrollToTopOfListeDesResultats,
	} = props;

	const LOADING_STATUS = 'loading';
	const STALLED_STATUS = 'stalled';

	const { status, results } = useInstantSearch();
	const isSettingUp: boolean = results.__isArtificial || false;
	const [isInstantSearchLoading, setIsInstantSearchLoading] = useState<boolean>(true);

	const ref = useSynchronizedRef(outerRef);

	useEffect(() => {
		setIsInstantSearchLoading((status === LOADING_STATUS || status === STALLED_STATUS) && isSettingUp);
	}, [status, isSettingUp]);

	return (
		<>
			<section className="separator">
				<Container className={styles.ResultatTotal}>
					<MessageResultatRecherche
						labelSingulier={messageResultatRechercheLabelSingulier}
						labelPluriel={messageResultatRechercheLabelPluriel}
						isLoading={isInstantSearchLoading}
						numberOfResult={results.nbHits}
					/>
				</Container>
			</section>
			<ListeDesResultats
				ref={ref}
				resultats={<Hits aria-label={ariaLabelListeDesResultats} hitComponent={resultatDeRecherche}/>}
				skeletonRepeat={nombreDeSkeleton}
				pagination={<MeiliSearchCustomPagination numberOfResultPerPage={nombreDeResultatParPage} className={styles.pagination} onPageChange={scrollToTopOfListeDesResultats}/>}
				isLoading={isInstantSearchLoading}
				isAffichageListeDeResultatsDesktopDirectionRow={isAffichageListeDeResultatsDesktopDirectionRow}
			/>
		</>
	);
}) as <THit extends BaseHit>(props: AfficherResultatDeRechercheWithScrollProps<THit>, outerRef: React.Ref<HTMLElement> | null) => React.ReactElement;

