import React from 'react';

import { AnnonceDeLogement } from '~/client/components/features/Logement/Annonce';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import NotFound from '~/pages/404.page';

const MEILISEARCH_INDEX = 'annonce-de-logement';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;
const ANNONCE_PAR_PAGE = 9 ;

function AfficherFormulaireDeRecherche() {
  return (
    <form>
      <MeilisearchCustomSearchBox
        label="Rechercher par ville"
        name="ville"
        placeholder="Exemples: Paris, Toulouse"
      />
      <MeilisearchCustomRefinementList
        attribute="type"
        label="Type d'offre"
        sortBy={['name:asc']}
      />
    </form>
  );
}

export default function AnnoncesPage() {
  const displayAnnoncesLogement = process.env.NEXT_PUBLIC_LOGEMENT_FEATURE === '1';

  if (!displayAnnoncesLogement) return <NotFound/>;
  return (
    <>
      <HeadTag
        title="Rechercher un logement | 1jeune1solution"
        description="Logement étudiant et location jeune actif partout en France"
      />
      <InstantSearchLayout
        meilisearchIndex={MEILISEARCH_INDEX}
        nombreDeResultatParPage={ANNONCE_PAR_PAGE}
        titre="Logement étudiant et location jeune actif partout en France"
        sousTitre="Faites votre recherche parmi plus de 300 000 offres de logements étudiants"
        isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
        formulaireDeRecherche={<AfficherFormulaireDeRecherche />}
        messageResultatRechercheLabelSingulier="annonce pour étudiants"
        messageResultatRechercheLabelPluriel="annonces pour étudiants"
        nombreDeSkeleton={3}
        ariaLabelListeDesResultats="Annonces de logement"
        resultatDeRecherche={AnnonceDeLogement}
        hasTagList={false}
        isResultatFullScreen={false}
      />
    </>
  );
}
