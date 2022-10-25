import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import React from 'react';
import { Configure, CurrentRefinements, Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';

import { RésultatRechercherMétier } from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier';
import { Container } from '~/client/components/layouts/Container/Container';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchStats } from '~/client/components/ui/Meilisearch/MeilisearchStats';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { mapFicheMetier } from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.repository';
import { FicheMétierHttp } from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.response';

import styles from './RechercherMétier.module.scss';

const MEILISEARCH_INDEX = 'fiche-metier';
const HITS_PER_PAGE = 15;

export default function RechercherMétier() {
  const searchClient = useDependency<SearchClient>('rechercheClientService');

  const renderResult = ({ hit }: { hit: Partial<FicheMétierHttp> }) => <RésultatRechercherMétier résultat={mapFicheMetier(hit)} />;
  
  return (
    <InstantSearch searchClient={searchClient} indexName={MEILISEARCH_INDEX} routing={true}>
      <Configure hitsPerPage={HITS_PER_PAGE}/>
      <div className={styles.headingSection}>
        <Container className={styles.formContainer}>
          <div className={styles.inputNomMetier}>
            <label>Indiquez le métier que vous recherchez</label>
            <SearchBox
              classNames={{ input: styles.inputText, loadingIcon: styles.none, reset: styles.none, submit: styles.none, submitIcon: styles.none }}
              placeholder="Exemple: cuisinier"
              onKeyDown={(e) => { if (e.key == 'Enter') e.preventDefault(); }}
            />
          </div>
          <MeilisearchCustomRefinementList className={styles.inputCentresInteret} attribute='centres_interet' label="Centres d'intérêt" />
        </Container>
      </div>
      <div className={styles.resultInfosContainer}>
        <Container>
          <CurrentRefinements
            classNames={{ category: styles.tag, item: styles.tagList, label: styles.none, noRefinementList: styles.none, noRefinementRoot: styles.none }}
            transformItems={(items) => (
              items.map((item) => ({
                ...item,
                refinements: item.refinements.map((refinement) => ({
                  ...refinement,
                  label: getCapitalizedItems(refinement.label),
                })),
              }))
            )}
          />
          <MeilisearchStats labelSingulier='fiche métier' labelPluriel='fiches métier'/>
        </Container>
      </div>
      <div className={styles.bodySection}>
        <Container>
          <Hits hitComponent={renderResult} className={styles.resultList} />
          <MeiliSearchCustomPagination padding={0} numberOfResultPerPage={HITS_PER_PAGE} />
        </Container>
      </div>
    </InstantSearch>
  );
}
