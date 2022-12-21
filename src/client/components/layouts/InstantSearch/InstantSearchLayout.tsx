import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import React, {
  useCallback,
  useEffect,
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
import styles from '~/client/components/layouts/InstantSearch/InstantSearchLayout.module.scss';
import { ListeDesResultats } from '~/client/components/layouts/InstantSearch/ListeDesResultats';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MessageResultatRecherche } from '~/client/components/ui/Meilisearch/MessageResultatRecherche';
import { useDependency } from '~/client/context/dependenciesContainer.context';

interface InstantSearchLayoutProps {
  meilisearchIndex: string
  nombreDeResultatParPage: number
  titre: string
  sousTitre: string
  isMeilisearchQueryParamsRoutingEnabled: boolean
  formulaireDeRecherche: React.ReactElement
  messageResultatRechercheLabelSingulier: string
  messageResultatRechercheLabelPluriel: string
  nombreDeSkeleton: number
  ariaLabelListeDesResultats: string
  resultatDeRecherche: React.ReactElement
  hasTagList: boolean
  isAffichageListeDeResultatsDesktopDirectionRow: boolean
}

export function InstantSearchLayout(props: InstantSearchLayoutProps) {
  const {
    meilisearchIndex,
    nombreDeResultatParPage,
    titre,
    sousTitre,
    isMeilisearchQueryParamsRoutingEnabled,
    formulaireDeRecherche,
    messageResultatRechercheLabelSingulier,
    messageResultatRechercheLabelPluriel,
    nombreDeSkeleton,
    ariaLabelListeDesResultats,
    resultatDeRecherche,
    hasTagList,
    isAffichageListeDeResultatsDesktopDirectionRow,
  } = props;

  const searchClient = useDependency<SearchClient>('rechercheClientService');
  const LOADING_STATUS = 'loading';
  const STALLED_STATUS = 'stalled';

  const transformItems: CurrentRefinementsProps['transformItems'] = useCallback((items) => {
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

  const AfficherResultatDeRecherche = () => {
    const { status,  results } = useInstantSearch();
    const isSettingUp = results.__isArtificial;
    const [isInstantSearchLoading, setIsInstantSearchLoading] = useState<boolean>(true);

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
          resultats={<Hits aria-label={ariaLabelListeDesResultats} hitComponent={resultatDeRecherche}/>}
          skeletonRepeat={nombreDeSkeleton}
          pagination={<MeiliSearchCustomPagination numberOfResultPerPage={nombreDeResultatParPage} className={styles.pagination}/>}
          isLoading={isInstantSearchLoading}
          isAffichageListeDeResultatsDesktopDirectionRow={isAffichageListeDeResultatsDesktopDirectionRow}
        />
      </>
    );
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
        <AfficherResultatDeRecherche />
      </InstantSearch>
    </main>
  );
};
