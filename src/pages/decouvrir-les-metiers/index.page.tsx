import classNames from 'classnames';
import React from 'react';

import { RésultatRechercherMétier } from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier';
import { MétierDuSoinPartner } from '~/client/components/features/Partner/MétiersDuSoinPartner';
import { Container } from '~/client/components/layouts/Container/Container';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { EnTeteSection } from '~/client/components/ui/EnTeteSection/EnTeteSection';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';
import styles from '~/pages/decouvrir-les-metiers/decouvrir-les-metiers.module.scss';
import {
  FicheMétierHttp,
  mapFicheMetier,
} from '~/server/fiche-metier/domain/ficheMetierHttp';


const MEILISEARCH_INDEX = 'fiche-metier';
const HITS_PER_PAGE = 15;
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;
const MEILISEARCH_SORT_BY_LABEL_ASC = ['name:asc'];

export default function RechercherFicheMetierPage() {
  useReferrer();

  const renderResult = ({ hit }: { hit: Partial<FicheMétierHttp> }) => <RésultatRechercherMétier résultat={mapFicheMetier(hit)} />;

  function AfficherFormulaireDeRecherche() {
    return (
      <form className={styles.RechercherMetierForm} onSubmit={(event) => event.preventDefault()}>
        <MeilisearchCustomSearchBox
          className={styles.inputNomMetier}
          label="Indiquez le métier que vous recherchez"
          name="metier"
          placeholder="Exemple: cuisinier"
        />
        <MeilisearchCustomRefinementList
          className={styles.inputCentresInteret}
          attribute='centres_interet'
          limit={100}
          label="Centres d'intérêt"
          sortBy={MEILISEARCH_SORT_BY_LABEL_ASC}
        />
      </form>

    );
  }

  return (
    <>
      <HeadTag
        title={'Rechercher un métier | 1jeune1solution'}
        description="Trouver le métier qui vous correspond"
      />
      <InstantSearchLayout
        meilisearchIndex={MEILISEARCH_INDEX}
        nombreDeResultatParPage={HITS_PER_PAGE}
        titre="Trouvez le métier"
        sousTitre="qui vous correspond"
        isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
        formulaireDeRecherche={<AfficherFormulaireDeRecherche />}
        messageResultatRechercheLabelSingulier="fiche métier"
        messageResultatRechercheLabelPluriel="fiches métier"
        nombreDeSkeleton={2}
        ariaLabelListeDesResultats="fiches métier"
        resultatDeRecherche={renderResult}
        hasTagList
        isAffichageListeDeResultatsDesktopDirectionRow
      />
      <EnTeteSection heading="Découvrez des services faits pour vous" />
      <div className={classNames(styles.additionalSection, 'background-white-lilac')}>
        <Container className={styles.partnerCardContainer}>
          <MétierDuSoinPartner />
        </Container>
      </div>
    </>
  );
}
