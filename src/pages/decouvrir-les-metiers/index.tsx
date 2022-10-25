import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import classNames from 'classnames';
import React from 'react';
import { Configure, CurrentRefinements, Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';

import {
  RésultatRechercherMétier,
} from '~/client/components/features/FicheMétier/RésultatRechercherMétier/RésultatRechercherMétier';
import { MétierDuSoinPartner } from '~/client/components/features/Partner/MétiersDuSoinPartner';
import { Container } from '~/client/components/layouts/Container/Container';
import { EnTeteSection } from '~/client/components/ui/EnTeteSection/EnTeteSection';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchStats } from '~/client/components/ui/Meilisearch/MeilisearchStats';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useReferrer from '~/client/hooks/useReferrer';
import { mapFicheMetier } from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.repository';
import { FicheMétierHttp } from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.response';

import styles from './decouvrir-les-metiers.module.scss';

const MEILISEARCH_INDEX = 'fiche-metier';
const HITS_PER_PAGE = 15;

export default function RechercherFicheMetierPage() {
  useReferrer();

  const searchClient = useDependency<SearchClient>('rechercheClientService');

  const resultat = ({ hit }: { hit: Partial<FicheMétierHttp> }) => {
    return <RésultatRechercherMétier résultat={mapFicheMetier(hit)} />;
  };

  return (
    <>
      <HeadTag
        title={'Rechercher un métier | 1jeune1solution'}
        description="Trouver le métier qui vous correspond"/>
      <main id="contenu">
        <LightHero primaryText="Trouvez le métier" secondaryText="qui vous correspond" />
        <InstantSearch searchClient={searchClient} indexName={MEILISEARCH_INDEX} routing={true}>
          <Configure hitsPerPage={HITS_PER_PAGE}/>
          <div className={styles.headingSection}>
            <Container className={styles.formContainer}>
              <form className={styles.form} role='form'>
                <div className={styles.inputNomMetier}>
                  <label>Indiquez le métier que vous recherchez</label>
                  <SearchBox
                    classNames={{ input: styles.inputText, loadingIcon: styles.none, reset: styles.none, submit: styles.none, submitIcon: styles.none }}
                    placeholder="Exemple: cuisinier"
                    onKeyDown={(e) => {if (e.key == 'Enter') e.preventDefault();}}
                  />
                </div>
                <MeilisearchCustomRefinementList className={styles.inputCentresInteret} attribute='centres_interet' label="Centres d'intérêt" />
              </form>
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
              <Hits hitComponent={resultat} className={styles.resultList} />
              <MeiliSearchCustomPagination padding={0} numberOfResultPerPage={HITS_PER_PAGE} />
            </Container>
          </div>
        </InstantSearch>
        <EnTeteSection heading="Découvrez des services faits pour vous" />
        <div className={classNames(styles.additionalSection, 'background-white-lilac')}>
          <Container className={styles.partnerCardContainer}>
            <MétierDuSoinPartner />
          </Container>
        </div>
      </main>
    </>
  );
}
