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
  const salaireOffreEmploi = useSanitize(offreEmploi.salaire);

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
        <div>
          {offreEmploi.description && <p dangerouslySetInnerHTML={{ __html: descriptionOffreEmploi }}/>}
          {offreEmploi.compétences &&
            <><Title as="h2" look="h4">Connaissances et compétences requises :</Title>
              <ul>
                {offreEmploi.compétences?.map((compétence, index) => <li key={index}>{compétence}</li>)}
              </ul>
            </>
          }
          {offreEmploi.qualitéesProfessionnelle &&
            <><Title as="h2" look="h4">Qualités professionnelles :</Title>
              <ul>
                {offreEmploi.qualitéesProfessionnelle?.map((qualitéesProfessionnelle, index) => <li
                  key={index}>{qualitéesProfessionnelle}</li>)}
              </ul>
            </>
          }
          {offreEmploi.formations &&
            <><Title as="h2" look="h4">Formation requise </Title>
              <ul>
                {offreEmploi.formations?.map((formation, index) => <li
                  key={index}>{formation.libellé} & {formation.commentaire}</li>)}
              </ul>
            </>
          }
          {offreEmploi.salaire &&
           <div><strong>Salaire</strong><p>{salaireOffreEmploi}</p></div>
          }
        </div>
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
