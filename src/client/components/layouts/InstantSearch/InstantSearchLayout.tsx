import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import { SendEventForHits } from 'instantsearch.js/es/lib/utils/createSendEventForHits';
import { BaseHit } from 'instantsearch.js/es/types/results';
import React, { useRef } from 'react';
import { Configure, Hits, InstantSearch, useInstantSearch, useStats } from 'react-instantsearch';

import { Container } from '~/client/components/layouts/Container/Container';
import { InstantSearchErrorBoundary } from '~/client/components/layouts/InstantSearch/InstantSearchErrorBoundary';
import styles from '~/client/components/layouts/InstantSearch/InstantSearchLayout.module.scss';
import { ListeDesResultats } from '~/client/components/layouts/InstantSearch/ListeDesResultats';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MessageResultatRecherche } from '~/client/components/ui/Meilisearch/MessageResultatRecherche';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';
import { RoutingService } from '~/client/services/routing/routing.service';

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
    isAffichageListeDeResultatsDesktopDirectionRow: boolean
    resultatDeRecherche: HitComponent<THit>
}

interface InstantSearchLayoutProps<THit extends BaseHit> extends AfficherResultatDeRechercheProps<THit> {
    meilisearchIndex: string
    titre: string
    sousTitre: string
    formulaireDeRecherche: React.ReactElement
    tagList: React.ReactElement
}

export function InstantSearchLayout<THit extends BaseHit = BaseHit>(props: InstantSearchLayoutProps<THit>) {
	const {
		meilisearchIndex,
		nombreDeResultatParPage,
		titre,
		sousTitre,
		formulaireDeRecherche,
		tagList,
		messageResultatRechercheLabelSingulier,
		messageResultatRechercheLabelPluriel,
		nombreDeSkeleton,
		resultatDeRecherche ,
		isAffichageListeDeResultatsDesktopDirectionRow,
	} = props;

	const searchClient = useDependency<SearchClient>('rechercheClientService');
	const routing = useDependency<RoutingService>('routingService');

	const listeDesResultatsRef = useRef<HTMLElement>(null);

	const scrollToTopOfListeDesResultats = () => {
		listeDesResultatsRef.current?.scrollIntoView(true);
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
				routing={routing}
			>
				<InstantSearchErrorBoundary>
					<>
						<Configure hitsPerPage={nombreDeResultatParPage}/>
						<section className="separator">
							<Container>
								{formulaireDeRecherche}
							</Container>
						</section>
						<Container className={styles.TagListWrapper}>
							{tagList}
						</Container>
						<AfficherResultatDeRecherche
							messageResultatRechercheLabelSingulier={messageResultatRechercheLabelSingulier}
							messageResultatRechercheLabelPluriel={messageResultatRechercheLabelPluriel}
							nombreDeSkeleton={nombreDeSkeleton}
							resultatDeRecherche={resultatDeRecherche as HitComponent<BaseHit>}
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

type AfficherResultatDeRechercheWithScrollProps<THit extends BaseHit = BaseHit> =
    AfficherResultatDeRechercheProps<THit>
    & { scrollToTopOfListeDesResultats: () => void };

const AfficherResultatDeRecherche = React.forwardRef(function AfficherResultatDeRecherche<THit extends BaseHit>(props: AfficherResultatDeRechercheWithScrollProps<THit>, outerRef: React.Ref<HTMLElement> | null) {
	const {
		messageResultatRechercheLabelSingulier,
		messageResultatRechercheLabelPluriel,
		nombreDeSkeleton,
		resultatDeRecherche,
		isAffichageListeDeResultatsDesktopDirectionRow,
		nombreDeResultatParPage,
		scrollToTopOfListeDesResultats,
	} = props;

	const LOADING_STATUS = 'loading';
	const STALLED_STATUS = 'stalled';

	const { status, results } = useInstantSearch();
	const isSettingUp: boolean = results.__isArtificial ?? false;
	const { nbHits } = useStats();

	const ref = useSynchronizedRef(outerRef);

	const isInstantSearchLoading = (status === LOADING_STATUS || status === STALLED_STATUS) && isSettingUp;

	return (
		<>
			<section className="separator">
				<Container className={styles.ResultatTotal}>
					<MessageResultatRecherche
						labelSingulier={messageResultatRechercheLabelSingulier}
						labelPluriel={messageResultatRechercheLabelPluriel}
						isLoading={isInstantSearchLoading}
						numberOfResult={nbHits}
					/>
				</Container>
			</section>
			<ListeDesResultats
				ref={ref}
				resultats={<Hits hitComponent={resultatDeRecherche}/>}
				skeletonRepeat={nombreDeSkeleton}
				pagination={<MeiliSearchCustomPagination numberOfResultPerPage={nombreDeResultatParPage}
					className={styles.pagination}
					onPageChange={scrollToTopOfListeDesResultats}/>}
				isLoading={isInstantSearchLoading}
				isAffichageListeDeResultatsDesktopDirectionRow={isAffichageListeDeResultatsDesktopDirectionRow}
			/>
		</>
	);
}) ;

