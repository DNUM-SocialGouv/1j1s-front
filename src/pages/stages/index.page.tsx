import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import classNames from 'classnames';
import React from 'react';
import {
  Configure,
  CurrentRefinements,
  Hits,
  InstantSearch,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';

import { Domaines, OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { Container } from '~/client/components/layouts/Container/Container';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { MeilisearchInputRefinement } from '~/client/components/ui/Meilisearch/MeilisearchInputRefinement';
import { MeilisearchStats } from '~/client/components/ui/Meilisearch/MeilisearchStats';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useReferrer from '~/client/hooks/useReferrer';
import styles from '~/pages/stages/RechercherStagePage.module.scss';

const IMAGE_FIXE = '/images/logos/fallback.svg';
const HITS_PER_PAGE = 15;
const LIMIT_MAX_FACETS = 100000;
const LIMIT_MAX_DOMAINS = 100;
const MEILISEARCH_INDEX = 'offre-de-stage:dateDeDebut:desc';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;

const Résultat = ({ hit: résultat }: { hit: OffreDeStageIndexée }) => {
  const listeEtiquettes: Array<string> = résultat.domaines
    ? résultat.domaines
      .filter((domaine) => domaine !== Domaines.NON_RENSEIGNE)
      .map((domaine) => getCapitalizedItems(domaine))
    : [];
  listeEtiquettes.push(
    résultat.localisation?.ville || résultat.localisation?.departement || résultat.localisation?.region as string,
    résultat.dureeCategorisee !== 'Non renseigné' ? résultat.dureeCategorisee as string : '',
    'Débute le : ' + new Date(résultat.dateDeDebut).toLocaleDateString(),
  );

  return <RésultatRechercherSolution
    lienOffre={`/stages/${résultat.slug}`}
    intituléOffre={résultat.titre}
    logoEntreprise={IMAGE_FIXE}
    nomEntreprise={résultat.nomEmployeur}
    étiquetteOffreList={listeEtiquettes || []}
    key={résultat.slug}
  />;
};

export default function RechercherOffreStagePage() {
  useReferrer();

  const searchClient = useDependency<SearchClient>('rechercheClientService');

  function AfficherListeDeRésultats() {
    const { status } = useInstantSearch();

    return <div className={classNames(styles.stageListeResultatsWrapper, 'background-white-lilac')}>
      <Container>
        <Skeleton type='card' isLoading={status === 'loading'} repeat={2}>
          <></>
        </Skeleton>
        <Hits
          hitComponent={Résultat}
          classNames={{ root: styles.stageListeRootElement }}
        />
        <div className={styles.paginationContainer}>
          <MeiliSearchCustomPagination
            padding={0}
            numberOfResultPerPage={HITS_PER_PAGE}
          />
        </div>
      </Container>
    </div>;
  }

  return (
    <>
      <HeadTag
        title={'Rechercher un stage | 1jeune1solution'}
        description="Des milliers d'offres de stages sélectionnées pour vous"/>
      <main id="contenu">
        <LightHero
          primaryText="Des milliers d'offres de stages"
          secondaryText="sélectionnées pour vous"
        />
        <InstantSearch searchClient={searchClient} indexName={MEILISEARCH_INDEX}
          routing={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}>
          <Configure hitsPerPage={HITS_PER_PAGE}/>
          <div className={'separator'}>
            <Container className={styles.stageFormWrapper}>
              <form className={styles.stageForm}>
                <div className={styles.formWrapper}>
                  <MeilisearchCustomSearchBox
                    label="Métiers, mots clés, …"
                    name="motCle"
                    placeholder="Métiers, mots clés, …"
                  />
                  <MeilisearchInputRefinement attribute={'localisationFiltree'}
                    limit={LIMIT_MAX_FACETS}/>
                  <MeilisearchCustomRefinementList
                    attribute={'domaines'}
                    limit={LIMIT_MAX_DOMAINS}
                    label={'Domaines'}
                    sortBy={['name:asc']}/>
                  <MeilisearchCustomRefinementList
                    attribute={'dureeCategorisee'}
                    label={'Durée de stage'}
                    sortBy={['name:asc']}/>
                </div>
              </form>
            </Container>
          </div>
          <div className={'separator'}>
            <Container>
              <div className={styles.informationRésultats}>
                <CurrentRefinements
                  transformItems={(items) => {
                    return items
                      .map((item) => ({
                        ...item,
                        refinements: item.refinements
                          .map((refinement) => ({
                            ...refinement,
                            label: getCapitalizedItems(refinement.label),
                          })),
                      }));
                  }}
                  classNames={
                    {
                      category: styles.stageTagCategoryElement,
                      categoryLabel: styles.stageTagItem,
                      item: styles.stageTagItem,
                      label: styles.none,
                      noRefinementList: styles.none,
                      noRefinementRoot: styles.none,
                    }
                  }/>
                <MeilisearchStats labelSingulier='offre de stage' labelPluriel='offres de stage'/>
              </div>
            </Container>
          </div>
          <AfficherListeDeRésultats/>
        </InstantSearch>
      </main>
    </>
  );
}
