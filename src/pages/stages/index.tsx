import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import React from 'react';
import { CurrentRefinements, Hits,InstantSearch, Pagination, SearchBox } from 'react-instantsearch-hooks-web';

import { OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import {
  RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { HeadTag } from '~/client/components/utils/HeaderTag';

const searchClient = instantMeiliSearch(
  'http://localhost:7700',
  'masterKey',
);

const IMAGE_FIXE = '/images/logos/fallback.svg';
const Résultat = (({ hit: résultat }: { hit: OffreDeStageIndexée }) => {
  return <RésultatRechercherSolution
    lienOffre={`/stages/${résultat.slug}`}
    intituléOffre={résultat.titre}
    logoEntreprise={IMAGE_FIXE}
    nomEntreprise={résultat.nomEmployeur}
    descriptionOffre={résultat.description}
    étiquetteOffreList = {résultat.domaines || [] }
  />;
});

export default function RechercherOffreStagePage() {
  return (
    <><HeadTag
      title={'Des milliers d\'offres de stages sélectionnés pour vous'}
      description="Des milliers d'offres de stages sélectionnées pour vous"/>
    <main id="contenu">
      <InstantSearch searchClient={searchClient} indexName="offre-de-stage">
        <SearchBox/>
        <CurrentRefinements/>
        <Hits hitComponent={Résultat}  />
        <Pagination/>
      </InstantSearch>
    </main>
    </>
  );
}
