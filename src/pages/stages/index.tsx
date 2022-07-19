import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import React from 'react';
import { Hits,InstantSearch, RefinementList, SearchBox  } from 'react-instantsearch-hooks-web';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.css';
import { HeadTag } from '~/client/components/utils/HeaderTag';

const searchClient = instantMeiliSearch(
  'https://integration-demos.meilisearch.com',
  '99d1e034ed32eb569f9edc27962cccf90b736e4c5a70f7f5e76b9fab54d6a185',
);

export default function RechercherOffreStagePage() {
  return (
    <><HeadTag
      title={'Des milliers d\'offres de stages sélectionnés pour vous'}
      description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"/>
    <main id="contenu">
      <p className={styles.rechercheSolution}>coucou hibou</p>
      <InstantSearch searchClient={searchClient} indexName="steam-video-games">
        <SearchBox></SearchBox>
        <RefinementList attribute={'genres'}/>
        <Hits></Hits>
      </InstantSearch>
    </main>
    </>
  )
  ;
}
