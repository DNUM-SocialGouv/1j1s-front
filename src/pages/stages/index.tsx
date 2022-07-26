import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import React from 'react';
import { CurrentRefinements,DynamicWidgets, Hits,InstantSearch, Pagination, RefinementList, SearchBox  } from 'react-instantsearch-hooks-web';

import { OffreDeStageIndexee } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import {
  RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { HeadTag } from '~/client/components/utils/HeaderTag';

const searchClient = instantMeiliSearch(
  'http://localhost:7700',
  'masterKey',
);

const Hit = (({ hit: résultat }: {hit: OffreDeStageIndexee}) => {
  return <RésultatRechercherSolution
    lienOffre={`/stages/${résultat.slug}`}
    intituléOffre={résultat.id}
    logoEntreprise={'/images/logos/pole-emploi.svg'}
    nomEntreprise={résultat.nomEmployeur}
    descriptionOffre={résultat.description}
    étiquetteOffreList={résultat.domaines|| [] }
  />;
});

export default function RechercherOffreStagePage() {
  return (
    <><HeadTag
      title={'Des milliers d\'offres de stages sélectionnés pour vous'}
      description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"/>
    <main id="contenu">
      <InstantSearch searchClient={searchClient} indexName="offre-de-stage">
        <SearchBox className={'fr-input'}/>
        <CurrentRefinements/>
        <DynamicWidgets>
          <RefinementList attribute={'dureeEnJour'}/>
        </DynamicWidgets>
        <Hits hitComponent={Hit}  />
        <Pagination/>
      </InstantSearch>
    </main>
    </>
  );
}
