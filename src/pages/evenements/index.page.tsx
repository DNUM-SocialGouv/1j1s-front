import React from 'react';

import { Evenement } from '~/client/components/features/Evenement/Evenement.type';
import { RésultatRechercherEvenement } from '~/client/components/features/Evenement/RésultatRechercherEvenement';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { MeilisearchInputRefinement } from '~/client/components/ui/Meilisearch/MeilisearchInputRefinement';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/evenements/RechercherEvenementPage.module.scss';

const HITS_PER_PAGE = 15;
const MEILISEARCH_INDEX = 'evenement:dateDebut:asc';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;
const LIMIT_MAX_FACETS = 10000;

export default function PageEvenements() {
  const displayRechercheEvenement = process.env.NEXT_PUBLIC_RECHERCHE_EVENEMENT_FEATURE === '1';

  const Résultat = ({ hit: résultat }: { hit: Evenement }) => {
    return <RésultatRechercherEvenement
      titreEvenement={résultat.titreEvenement}
      organismeOrganisateur={résultat.organismeOrganisateur}
      dateDebut={résultat.dateDebut}
      dateFin={résultat.dateFin}
      lieuEvenement={résultat.lieuEvenement}
      slug={résultat.slug}
    />;
  };

  function AfficherFormulaireDeRecherche() {
    return (
      <form className={styles.rechercherEvenementForm} onSubmit={(event) => event.preventDefault()}>
        <MeilisearchCustomSearchBox
          label="Mot-clé, métier, accompagnement…"
          name="motCle"
          placeholder="Exemples: gendarmerie, cuisinier, mentorat"
        />
        <MeilisearchInputRefinement
          attribute="lieuEvenement"
          limit={LIMIT_MAX_FACETS}
        />
      </form>
    );
  }

  return (
    <>
      {
        !displayRechercheEvenement && <>
          <HeadTag title={'Trouver un évènement Emploi | 1jeune1solution'}/>
          <main id='contenu'>
            <HeroWithButtonLink
              titlePrimaryText="Des centaines d'événements de recrutement "
              titleSecondaryText="pour tous les jeunes, partout en France"
              content='À la recherche d’un emploi ou d’une formation ?
              Dépassez les frontières du virtuel en allant directement à la rencontre de votre futur employeur,
              en participant à des ateliers thématiques ou en assistant à une conférence près de chez vous !'
              buttonLabel='Je trouve un événement Pôle Emploi'
              buttonLabelSecondary='Je trouve un événement ma Mission Locale'
              buttonHref='https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements'
              buttonHrefSecondary='https://40-ans.unml.info/le-programme'
              imgSrc='/images/évènements.webp'/>
          </main>
        </>
      }
      {displayRechercheEvenement && <>
        <HeadTag
          title={'Rechercher un évènement | 1jeune1solution'}
          description="Des centaines d'évènements de recrutement pour tous les jeunes, partout en France"/>
        <InstantSearchLayout
          meilisearchIndex={MEILISEARCH_INDEX}
          nombreDeResultatParPage={HITS_PER_PAGE}
          titre="Des centaines d'évènements de recrutement"
          sousTitre="pour tous les jeunes, partout en France"
          isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
          formulaireDeRecherche={<AfficherFormulaireDeRecherche/>}
          messageResultatRechercheLabelSingulier="évènement"
          messageResultatRechercheLabelPluriel="évènements"
          nombreDeSkeleton={2}
          ariaLabelListeDesResultats="Evènements"
          resultatDeRecherche={Résultat}
          hasTagList
          isAffichageListeDeResultatsDesktopDirectionRow
        />
      </>
      }
    </>
  );
}
