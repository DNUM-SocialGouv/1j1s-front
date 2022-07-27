import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import { marked } from 'marked';
import React from 'react';
import { Configure, CurrentRefinements, Hits, InstantSearch, Pagination, SearchBox } from 'react-instantsearch-hooks-web';

import { OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import styles from '~/pages/stages/RechercherStagePage.module.css';


const IMAGE_FIXE = '/images/logos/fallback.svg';
const Résultat = (({ hit: résultat }: { hit: OffreDeStageIndexée }) => {
  return <RésultatRechercherSolution
    lienOffre={`/stages/${'idNonExistant' || résultat.slug}`}
    intituléOffre={résultat.titre}
    logoEntreprise={IMAGE_FIXE}
    nomEntreprise={résultat.nomEmployeur || 'Employeur'}
    descriptionOffre={marked.parse(résultat.description)}
    étiquetteOffreList={résultat.domaines || []}
    key={résultat.slug}
  />;
});

export default function RechercherOffreStagePage() {
  const searchClient = useDependency<SearchClient>('rechercheClientService');
  return (
    <><HeadTag
      title={'Des milliers d’offres de stages sélectionnés pour vous'}
      description="Des milliers d'offres de stages sélectionnées pour vous"/>
    <Hero>
                Des milliers d’offres de stages sélectionnés pour vous
    </Hero>
    <main id="contenu" className={'fr-container'}>
      <InstantSearch searchClient={searchClient} indexName="offre-de-stage">
        <Configure hitsPerPage={15}/>
        <SearchBox classNames={
          {
            form: [styles.stageFormElement].join(' '),
            input: ['fr-input', styles.stageInputElement].join(' '),
            root: styles.stageRootElement,
            submitIcon: styles.stageSubmitIconElement,
          }
        }
        placeholder="Métiers, mots clés, …"
        />
        <CurrentRefinements/>
        <Hits hitComponent={Résultat} classNames={
          {
            item: styles.stageItemElement,
            list: styles.stageListeElement,
            root: styles.stageListeRootElement,
          }
        }/>
        <Pagination/>
      </InstantSearch>
    </main>
    </>
  );
}
