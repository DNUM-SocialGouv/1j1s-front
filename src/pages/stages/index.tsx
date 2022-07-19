import 'instantsearch.css/themes/satellite.css';

import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import React from 'react';
import { Hits,InstantSearch, RefinementList, SearchBox  } from 'react-instantsearch-hooks-web';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.css';
import { HeadTag } from '~/client/components/utils/HeaderTag';

const searchClient = instantMeiliSearch(
  'http://localhost:7700',
  'masterKey',
);

export default function RechercherOffreStagePage() {
  return (
    <><HeadTag
      title={'Des milliers d\'offres de stages sélectionnés pour vous'}
      description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"/>
    <main id="contenu">
      <p className={styles.rechercheSolution}>coucou hibou</p>
      <InstantSearch searchClient={searchClient} indexName="stages">
        <SearchBox/>
        <RefinementList attribute={'domaines'} operator={'or'}/>
        <Hits/>
      </InstantSearch>
    </main>
    </>
  )
  ;
}
