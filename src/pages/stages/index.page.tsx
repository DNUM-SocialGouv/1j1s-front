import React from 'react';

import { Domaines, OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { MeilisearchInputRefinement } from '~/client/components/ui/Meilisearch/MeilisearchInputRefinement';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';
import styles from '~/pages/stages/RechercherStagePage.module.scss';

const IMAGE_FIXE = '/images/logos/fallback.svg';
const HITS_PER_PAGE = 15;
const LIMIT_MAX_FACETS = 100000;
const LIMIT_MAX_DOMAINS = 100;
const MEILISEARCH_INDEX = 'offre-de-stage:dateDeDebut:desc';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;

const Résultat = ({ hit: résultat }: { hit: OffreDeStageIndexée }) => {
  const listeEtiquettes: Array<string> = résultat.domaines
    ? résultat.domaines
      .filter((domaine) => domaine !== Domaines.NON_RENSEIGNE)
      .map((domaine) => getCapitalizedItems(domaine))
    : [];
  listeEtiquettes.push(
    résultat.localisation?.ville || résultat.localisation?.departement || résultat.localisation?.region as string,
    résultat.dureeCategorisee !== 'Non renseigné' ? résultat.dureeCategorisee as string : '',
    'Débute le : ' + new Date(résultat.dateDeDebut).toLocaleDateString(),
  );

  return <RésultatRechercherSolution
    lienOffre={`/stages/${résultat.slug}`}
    intituléOffre={résultat.titre}
    logoEntreprise={IMAGE_FIXE}
    nomEntreprise={résultat.nomEmployeur}
    étiquetteOffreList={listeEtiquettes || []}
    key={résultat.slug}
  />;
};

function AfficherFormulaireDeRecherche() {
  return (
    <form className={styles.form}>
      <MeilisearchCustomSearchBox
        label="Métiers, mots clés, …"
        name="motCle"
        placeholder="Métiers, mots clés, …"
      />
      <MeilisearchInputRefinement
        attribute={'localisationFiltree'}
        limit={LIMIT_MAX_FACETS}
      />
      <MeilisearchCustomRefinementList
        attribute={'domaines'}
        limit={LIMIT_MAX_DOMAINS}
        label={'Domaines'}
        sortBy={['name:asc']}
      />
      <MeilisearchCustomRefinementList
        attribute={'dureeCategorisee'}
        label={'Durée de stage'}
        sortBy={['name:asc']}
      />
    </form>
  );
}

export default function RechercherOffreStagePage() {
  useReferrer();

  return (
    <>
      <HeadTag
        title={'Rechercher un stage | 1jeune1solution'}
        description="Des milliers d'offres de stages sélectionnées pour vous"/>
      <InstantSearchLayout
        meilisearchIndex={MEILISEARCH_INDEX}
        nombreDeResultatParPage={HITS_PER_PAGE}
        titre="Des milliers d'offres de stages"
        sousTitre="sélectionnées pour vous"
        isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
        formulaireDeRecherche={<AfficherFormulaireDeRecherche />}
        messageResultatRechercheLabelSingulier="offre de stage"
        messageResultatRechercheLabelPluriel="offres de stage"
        nombreDeSkeleton={2}
        ariaLabelListeDesResultats="Offres de stage"
        resultatDeRecherche={Résultat}
        hasTagList
        isResultatFullScreen
      />
    </>
  );
}
