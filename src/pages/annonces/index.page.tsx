import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import React from 'react';
import {
  Hits,
  InstantSearch,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';

import { AnnonceDeLogement } from '~/client/components/features/Logement/Annonce';
import { ListeDesAnnonces } from '~/client/components/features/Logement/ListeDesAnnonces';
import { Container } from '~/client/components/layouts/Container/Container';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { MeilisearchStats } from '~/client/components/ui/Meilisearch/MeilisearchStats';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import NotFound from '~/pages/404.page';
import styles from '~/pages/annonces/RechercherLogement.module.scss';

import { MeilisearchCustomSearchBox } from '../../client/components/ui/Meilisearch/MeilisearchCustomSearchBox';

const MEILISEARCH_INDEX = 'annonce-de-logement';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;


function AfficherListeDesAnnonces() {
  const LOADING_STATUS = 'loading';
  const { status } = useInstantSearch();
  const isLoading = status === LOADING_STATUS;
  return <ListeDesAnnonces resultats={<Hits aria-label="Annonces de logement" hitComponent={AnnonceDeLogement}/>} isLoading={isLoading}/>;
}

function AfficherFormulaireDeRecherche() {
  return (
    <section className="separator">
      <Container className={styles.FormulaireDeRecherche}>
        <form>
          <MeilisearchCustomSearchBox
            label="Rechercher par ville"
            name="ville"
            placeholder="Exemples: Paris, Toulouse"
          />
        </form>
      </Container>
    </section>
  );
}

function AfficherResultatTotal() {
  return (
    <section className="separator">
      <Container className={styles.ResultatTotal}>
        <MeilisearchStats labelSingulier='annonce pour étudiants' labelPluriel='annonces pour étudiants'/>
      </Container>
    </section>
  );
}


export default function AnnoncesPage() {
  const displayAnnoncesLogement = process.env.NEXT_PUBLIC_LOGEMENT_FEATURE === '1';
  const searchClient = useDependency<SearchClient>('rechercheClientService');

  if (!displayAnnoncesLogement) return <NotFound/>;
  return (
    <>
      <HeadTag
        title={'Rechercher un logement | 1jeune1solution'}
        description="Logement étudiant et location jeune actif partout en France"
      />
      <main id="contenu">
        <LightHero
          primaryText="Logement étudiant et location jeune actif partout en France"
          secondaryText="Faites votre recherche parmi plus de 300 000 offres de logements étudiants"
        />

        <InstantSearch
          searchClient={searchClient}
          indexName={MEILISEARCH_INDEX}
          routing={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
        >
          <AfficherFormulaireDeRecherche />
          <AfficherResultatTotal />
          <AfficherListeDesAnnonces />

        </InstantSearch>
      </main>
    </>
  );
}
