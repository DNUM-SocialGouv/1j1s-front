import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import { CurrentRefinementsConnectorParamsItem } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { SendEventForHits } from 'instantsearch.js/es/lib/utils/createSendEventForHits';
import {
  BaseHit,
  Hit,
} from 'instantsearch.js/es/types/results';
import React, {
  JSXElementConstructor,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Configure,
  CurrentRefinements,
  CurrentRefinementsProps,
  Hits,
  InstantSearch,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';

import { Container } from '~/client/components/layouts/Container/Container';
import ErrorUnavailableService from '~/client/components/layouts/Error/ErrorUnavailableService';
import styles from '~/client/components/layouts/InstantSearch/InstantSearchLayout.module.scss';
import { ListeDesResultats } from '~/client/components/layouts/InstantSearch/ListeDesResultats';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MessageResultatRecherche } from '~/client/components/ui/Meilisearch/MessageResultatRecherche';
import { useSynchronizedRef } from '~/client/components/useSynchronizedRef';
import { useDependency } from '~/client/context/dependenciesContainer.context';

export interface HitProps<T> {
  hit: T
}

interface AfficherResultatDeRechercheProps {
  nombreDeResultatParPage: number
  messageResultatRechercheLabelSingulier: string
  messageResultatRechercheLabelPluriel: string
  nombreDeSkeleton: number
  ariaLabelListeDesResultats: string
  isAffichageListeDeResultatsDesktopDirectionRow: boolean
  resultatDeRecherche: JSXElementConstructor<{ hit: Hit<BaseHit>; sendEvent: SendEventForHits; }>
}

interface InstantSearchLayoutProps extends AfficherResultatDeRechercheProps {
  meilisearchIndex: string
  titre: string
  sousTitre: string
  isMeilisearchQueryParamsRoutingEnabled: boolean
  formulaireDeRecherche: React.ReactElement
  hasTagList: boolean
}

export function InstantSearchLayout(props: InstantSearchLayoutProps) {
  const {
    meilisearchIndex,
    nombreDeResultatParPage,
    titre,
    sousTitre,
    isMeilisearchQueryParamsRoutingEnabled,
    formulaireDeRecherche,
    hasTagList,
    messageResultatRechercheLabelSingulier,
    messageResultatRechercheLabelPluriel,
    nombreDeSkeleton,
    ariaLabelListeDesResultats,
    resultatDeRecherche,
    isAffichageListeDeResultatsDesktopDirectionRow,
  } = props;

  const searchClient = useDependency<SearchClient>('rechercheClientService');

  const transformItems: CurrentRefinementsProps['transformItems'] = useCallback((items: CurrentRefinementsConnectorParamsItem[]) => {
    return items
      .map((item) => ({
        ...item,
        refinements: item.refinements
          .map((refinement) => ({
            ...refinement,
            label: getCapitalizedItems(refinement.label),
          })),
      }));
  }, []);

  const currentRefinementsStyle = { category: styles.TagCategoryElement, item: styles.TagItem, label: 'display-none', noRefinementList: 'display-none', noRefinementRoot: 'display-none' };
  const listeDesResultatsRef = useRef(null);

  const scrollToTopOfListeDesResultats = () => {
    const sectionListeDesResultats = listeDesResultatsRef.current as unknown as HTMLElement;
    if (sectionListeDesResultats) {
      const axeHorizontal = sectionListeDesResultats.offsetLeft;
      const axeVertical = sectionListeDesResultats.offsetTop;
      window.scrollTo(axeHorizontal, axeVertical);
    }
  };

  return (
    <main id="contenu">
      <LightHero
        primaryText={titre}
        secondaryText={sousTitre}
      />
      <InstantSearch
        searchClient={searchClient}
        indexName={meilisearchIndex}
        routing={isMeilisearchQueryParamsRoutingEnabled}
      >
        <ErrorBoundary>
          <>
            <Configure hitsPerPage={nombreDeResultatParPage}/>
            <section className="separator">
              <Container>
                { formulaireDeRecherche }
              </Container>
            </section>
            { hasTagList &&
            <Container className={styles.TagListWrapper}>
              <CurrentRefinements
                transformItems={transformItems}
                classNames={currentRefinementsStyle}
              />
            </Container>
            }
            <AfficherResultatDeRecherche
              messageResultatRechercheLabelSingulier={messageResultatRechercheLabelSingulier}
              messageResultatRechercheLabelPluriel={messageResultatRechercheLabelPluriel}
              nombreDeSkeleton={nombreDeSkeleton}
              ariaLabelListeDesResultats={ariaLabelListeDesResultats}
              resultatDeRecherche={resultatDeRecherche}
              isAffichageListeDeResultatsDesktopDirectionRow={isAffichageListeDeResultatsDesktopDirectionRow}
              nombreDeResultatParPage={nombreDeResultatParPage}
              scrollToTopOfListeDesResultats={scrollToTopOfListeDesResultats}
              ref={listeDesResultatsRef}
            />
          </>
        </ErrorBoundary>

      </InstantSearch>
    </main>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode
}

const ErrorBoundary = (props: React.PropsWithChildren<ErrorBoundaryProps>) => {
  const { error } = useInstantSearch({ catchError: true });
  const { children } = props;

  if (error) return <ErrorUnavailableService />;

  return <>{ children } </>;
};

// eslint-disable-next-line react/display-name
const AfficherResultatDeRecherche = React.forwardRef<HTMLElement | null, AfficherResultatDeRechercheProps & { scrollToTopOfListeDesResultats: () => void }>((props: AfficherResultatDeRechercheProps & { scrollToTopOfListeDesResultats: () => void }, outerRef) => {
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
});
