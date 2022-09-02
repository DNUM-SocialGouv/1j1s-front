import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import React from 'react';
import { Configure, CurrentRefinements, Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';

import { OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { Container } from '~/client/components/layouts/Container/Container';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchStats } from '~/client/components/ui/Meilisearch/MeilisearchStats';
import { MeilsearchCustomPagination } from '~/client/components/ui/Meilisearch/MeilsearchCustomPagination';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import styles from '~/pages/stages/RechercherStagePage.module.scss';

const IMAGE_FIXE = '/images/logos/fallback.svg';
const HITS_PER_PAGE = 15;
const MEILISEARCH_INDEX = 'offre-de-stage:dateDeDebut:desc';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;
const Résultat = (({ hit: résultat }: { hit: OffreDeStageIndexée }) => {
  return <RésultatRechercherSolution
    lienOffre={`/stages/${résultat.slug}`}
    intituléOffre={résultat.titre}
    logoEntreprise={IMAGE_FIXE}
    nomEntreprise={résultat.nomEmployeur}
    étiquetteOffreList={résultat.domaines || []}
    key={résultat.slug}
  />;
});

export default function RechercherOffreStagePage() {
  const searchClient = useDependency<SearchClient>('rechercheClientService');
  return (
    <>
      <HeadTag
        title={'Rechercher un stage | 1jeune1solution'}
        description="Des milliers d'offres de stages sélectionnées pour vous"/>
      <Hero>
                Des milliers d’offres de stages sélectionnés pour vous
      </Hero>
      <Container className={[styles.stageContainer].join(' ')}>
        <InstantSearch searchClient={searchClient} indexName={MEILISEARCH_INDEX}
          routing={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}>
          <Configure hitsPerPage={HITS_PER_PAGE}/>
          <form className={styles.stageForm}>
            <label>Métiers, mots clés, …
              <SearchBox
                className='recherche-principale-stage'
                placeholder="Métiers, mots clés, …"
                classNames={
                  {
                    form: styles.stageFormElement,
                    input: ['fr-input', styles.stageInputElement].join(' '),
                    root: styles.stageRootElement,
                    submitIcon: styles.stageSubmitIconElement,
                  }
                }
              />
            </label>
            <div className={styles.stageSelectWrapper}>
              <MeilisearchCustomRefinementList
                attribute={'domaines'}
                limit={100}
                label={'Domaines'}
                sortBy={['name:asc']}/>
              <MeilisearchCustomRefinementList
                attribute={'dureeCategorisee'}
                label={'Durée de stage'}
                sortBy={['name:asc']}/>
            </div>
          </form>
          <CurrentRefinements
            classNames={
              {
                category: styles.stageTagCategoryElement,
                categoryLabel: styles.stageTagItem,
                item: styles.stageTagItem,
                label: styles.stageTagLabel,
                list: styles.stageTagList,
              }
            }
          />
          <MeilisearchStats labelSingulier='offre de stage' labelPluriel='offres de stage'/>
          <Hits
            hitComponent={Résultat}
            classNames={
              {
                item: styles.stageItemElement,
                list: styles.stageListeElement,
                root: styles.stageListeRootElement,
              }
            }/>
          <MeilsearchCustomPagination
            padding={0}
            numberOfResultPerPage={HITS_PER_PAGE}
          />
        </InstantSearch>
      </Container>
    </>
  );
}
