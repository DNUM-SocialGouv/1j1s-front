import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import { marked } from 'marked';
import React from 'react';
import { ClearRefinements,Configure, CurrentRefinements, Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';

import { OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { CustomPagination } from '~/client/components/ui/Meilisearch/Pagination';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import styles from '~/pages/stages/RechercherStagePage.module.scss';

const IMAGE_FIXE = '/images/logos/fallback.svg';
const HITS_PER_PAGE = 15;

const Résultat = (({ hit: résultat }: { hit: OffreDeStageIndexée }) => {
  return <RésultatRechercherSolution
    lienOffre={`/stages/${ résultat.slug }`}
    intituléOffre={résultat.titre}
    logoEntreprise={IMAGE_FIXE}
    nomEntreprise={résultat.nomEmployeur}
    descriptionOffre={marked.parse(résultat.description)}
    étiquetteOffreList={résultat.domaines || []}
    key={résultat.slug}
  />;
});

export default function RechercherOffreStagePage() {
  const searchClient = useDependency<SearchClient>('rechercheClientService');
  return (
    <><HeadTag
      title={'Rechercher un stage | 1jeune1solution'}
      description="Des milliers d'offres de stages sélectionnées pour vous"/>
    <Hero>
                Des milliers d’offres de stages sélectionnés pour vous
    </Hero>
    <main id="contenu" className={['fr-container', styles.stageContainer].join(' ')}>
      <InstantSearch searchClient={searchClient} indexName="offre-de-stage" routing={true}>
        <Configure hitsPerPage={HITS_PER_PAGE}/>
        <label>Métiers, mots clés, …
          <SearchBox
            className={'recherche-principale-stage'}
            placeholder="Métiers, mots clés, …"
            classNames={
              {
                form: [styles.stageFormElement].join(' '),
                input: ['fr-input', styles.stageInputElement].join(' '),
                root: styles.stageRootElement,
                submitIcon: styles.stageSubmitIconElement,
              }
            }
          />
        </label>
        <CurrentRefinements/>
        <ClearRefinements></ClearRefinements>
        <Hits 
          hitComponent={Résultat}
          classNames={
            {
              item: styles.stageItemElement,
              list: styles.stageListeElement,
              root: styles.stageListeRootElement,
            }
          }/>
        <CustomPagination
          padding={2}
          hits_per_page={HITS_PER_PAGE}/>
      </InstantSearch>
    </main>
    </>
  );
}
