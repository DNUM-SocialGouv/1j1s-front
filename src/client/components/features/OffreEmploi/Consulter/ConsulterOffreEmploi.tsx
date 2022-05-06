import { ButtonGroup, Link, Title } from '@dataesr/react-dsfr';
import React from 'react';

import styles from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi.module.css';
import { TagList } from '~/client/components/ui/TagList/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

interface ConsulterOffreEmploiProps {
  offreEmploi: OffreEmploi
}

export function ConsulterOffreEmploi({ offreEmploi }: ConsulterOffreEmploiProps) {
  const descriptionOffreEmploi = useSanitize(offreEmploi.description);
  
  return (
    <main id="contenu">
      <article className={styles.offreEmploiContainer}>
        <header className={styles.offreEmploiHeader}>
          <Title as="h1" look="h3">{offreEmploi.intitulé}</Title>
          {offreEmploi.entreprise.nom && <span className="fr-text--lead">{offreEmploi.entreprise.nom}</span>}
        </header>
        <TagList data-testid="ÉtiquetteOffreEmploiList" list={[
          offreEmploi.lieuTravail,
          offreEmploi.expérience,
          offreEmploi.typeContrat?.libelléCourt,
          offreEmploi.duréeTravail,
        ]} />
        {offreEmploi.description && <p dangerouslySetInnerHTML={{ __html: descriptionOffreEmploi }}/>}
        <ButtonGroup size="md">
          <Link
            href={offreEmploi.urlOffreOrigine}
            target="_blank"
            className="fr-btn--md fr-btn"
            icon="ri-external-link-line"
            iconPosition="right"
            display="flex"
            data-testid="LinkPostulerOffreEmploi"
          >
            Je postule sur Pôle Emploi
          </Link>
        </ButtonGroup>
      </article>
    </main>
  );
}
