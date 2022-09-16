import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import React from 'react';
import { Configure, CurrentRefinements, Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';

import { OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { Container } from '~/client/components/layouts/Container/Container';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchStats } from '~/client/components/ui/Meilisearch/MeilisearchStats';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useReferrer from '~/client/hooks/useReferrer';
import styles from '~/pages/stages/RechercherStagePage.module.scss';

const IMAGE_FIXE = '/images/logos/fallback.svg';
const HITS_PER_PAGE = 15;
const MEILISEARCH_INDEX = 'offre-de-stage:dateDeDebut:desc';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;

const Résultat = ({ hit: résultat }: { hit: OffreDeStageIndexée }) => {
  const listeEtiquettes: Array<string> = résultat.domaines?.filter((domaine) => domaine != 'non renseigné') || [];
  listeEtiquettes.push(
    résultat.localisation?.ville || résultat.localisation?.departement || résultat.localisation?.region as string,
    résultat.dureeCategorisee !== 'Non renseigné'? résultat.dureeCategorisee as string : '',
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
  return (
    <>
      <HeadTag
        title={'Rechercher un stage | 1jeune1solution'}
        description="Des milliers d'offres de stages sélectionnées pour vous"/>
      <main id="contenu">
        <LightHero primaryText="
                    Des milliers d'offres de stages" secondaryText="sélectionnées pour vous" />
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
                      reset: styles.none,
                      resetIcon: styles.none,
                      root: styles.stageRootElement,
                      submit: styles.none,
                      submitIcon: styles.none,
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
            <div className={styles.informationRésultats}>
              <CurrentRefinements
                classNames={
                  {
                    category: styles.stageTagCategoryElement,
                    categoryLabel: styles.stageTagItem,
                    item: styles.stageTagItem,
                    label: styles.none,
                    noRefinementList: styles.none,
                    noRefinementRoot: styles.none,
                  }
                }
              />
              <MeilisearchStats labelSingulier='offre de stage' labelPluriel='offres de stage'/>
            </div>
            <Hits
              hitComponent={Résultat}
              classNames={
                {
                  item: styles.stageItemElement,
                  list: styles.stageListeElement,
                  root: styles.stageListeRootElement,
                }
              }/>
            <MeiliSearchCustomPagination
              padding={0}
              numberOfResultPerPage={HITS_PER_PAGE}
            />
          </InstantSearch>
        </Container>
      </main>
    </>
  );
}
