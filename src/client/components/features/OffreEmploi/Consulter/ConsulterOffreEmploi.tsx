import {
  Button,
  Link,
  Title,
} from '@dataesr/react-dsfr';
import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.css';
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
    <main id="contenu" className={commonStyles.container}>
      <article className={commonStyles.layout}>
        <header className={commonStyles.titre}>
          <Title as="h1" look="h3">{offreEmploi.intitulé}</Title>
          {offreEmploi.entreprise.nom && <h2>{offreEmploi.entreprise.nom}</h2>}
          <TagList data-testid="ÉtiquetteOffreEmploiList" list={offreEmploi.étiquetteList} />
        </header>
        <section className={commonStyles.contenu}>
          <Button size="md" className={commonStyles.buttonPostuler}>
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
          </Button>
          {offreEmploi.description &&
          <article>
            <h3>Description de l&apos;entreprise:</h3>
            <p dangerouslySetInnerHTML={{ __html: descriptionOffreEmploi }}/>
          </article>
          }
          {offreEmploi.compétenceList.length > 0 &&
          <article>
            <h3>Connaissances et compétences requises:</h3> { ' ' }
            <ul className={commonStyles.competences}>
              { offreEmploi.compétenceList.map((compétence, index) => (
                <li key={index}>{compétence}</li>
              ))}
            </ul>
          </article>
          }
          {offreEmploi.qualitéeProfessionnelleList.length > 0 &&
          <article>
            <h3>Qualités professionnelles:</h3> { ' ' }
            <ul className={commonStyles.competences}>
              { offreEmploi.qualitéeProfessionnelleList.map((qualitéeProfessionnelle, index) => (
                <li key={index}>{qualitéeProfessionnelle}</li>
              ))}
            </ul>
          </article>
          }s
          {offreEmploi.formationList.length > 0 &&
          <article>
            <h3>Formation requise:</h3> { ' ' }
            { offreEmploi.formationList.length === 1
              ?  <p data-testid="FormationParagraph">{offreEmploi.formationList[0].libellé} - {offreEmploi.formationList[0].commentaire}</p>
              :  <ul className={commonStyles.competences} data-testid="FormationList">
                { offreEmploi.formationList.map((formation, index) => (
                  <li key={index}>{formation.libellé} - {formation.commentaire}</li>
                ))}
              </ul>
            }
          </article>
          }
          {offreEmploi.salaire &&
          <article>
            <span>
              <h3>Salaire:</h3> { ' ' }
              <p dangerouslySetInnerHTML={{ __html: salaireOffreEmploi }}/>
            </span>
          </article>
          }
        </section>
      </article>
    </main>
  );
}
