import 'instantsearch.css/themes/satellite.css';

import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import React, { ReactNode } from 'react';
import { CurrentRefinements,Hits,InstantSearch, Pagination, RefinementList, SearchBox  } from 'react-instantsearch-hooks-web';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.css';
import {
  RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { HeadTag } from '~/client/components/utils/HeaderTag';

const searchClient = instantMeiliSearch(
  'http://localhost:7700',
  'masterKey',
);

const Hit = (({ hit: résultat }): ReactNode => {
  return <RésultatRechercherSolution
    lienOffre={`/stages/${résultat.id}`}
    intituléOffre={résultat.id}
    logoEntreprise={'/images/logos/pole-emploi.svg'}
    nomEntreprise={résultat.nomEmployeur}
    descriptionOffre={résultat.description}
    étiquetteOffreList={résultat.domaines}
  />;
});

export default function RechercherOffreStagePage() {
  return (
    <><HeadTag
      title={'Des milliers d\'offres de stages sélectionnés pour vous'}
      description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"/>
    <main id="contenu">
      <p className={styles.rechercheSolution}>coucou hibou</p>
      <InstantSearch searchClient={searchClient} indexName="offre-de-stage">
        <SearchBox className={'fr-input'}/>
        <CurrentRefinements/>
        <RefinementList attribute={'dureeEnJour'} operator={'or'} />
        <RefinementList attribute={'domaines'}/>
        <Hits hitComponent={Hit}  />
        <Pagination/>
      </InstantSearch>
    </main>
    </>
  )
  ;
}
