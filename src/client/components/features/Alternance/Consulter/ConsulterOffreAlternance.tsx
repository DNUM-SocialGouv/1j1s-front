
import {
  Button,
  Link,
  Title,
} from '@dataesr/react-dsfr';
import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.css';
import { TagList } from '~/client/components/ui/TagList/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import {
  Alternance,
  isAlternanceMatcha,
  isAlternancePeJob,
} from '~/server/alternances/domain/alternance';

interface ConsulterOffreAlternanceProps {
  offreAlternance: Alternance
}

export function ConsulterOffreAlternance(props: ConsulterOffreAlternanceProps) {
  const { offreAlternance } = props;
  const descriptionOffreAlternance = useSanitize(offreAlternance.description);

  if (isAlternanceMatcha(offreAlternance)) {
    return (
      <main id="contenu" className={commonStyles.container}>
        <article className={commonStyles.layout}>
          <header className={commonStyles.titre}>
            <Title as="h1" look="h3">{offreAlternance.intitulé}</Title>
            <h2>{offreAlternance.entreprise.nom}</h2>
            <TagList list={offreAlternance.étiquetteList} />
          </header>
          <section className={commonStyles.contenu}>
            {offreAlternance.description &&
            <article>
              <h3>Description de l&apos;entreprise:</h3>
              <p dangerouslySetInnerHTML={{ __html: descriptionOffreAlternance }}/>
            </article>
            }
            {offreAlternance.competencesDeBase.length > 0 &&
            <article>
              <h3>Compétences visées:</h3>
              <ul className={commonStyles.competences}>
                { offreAlternance.competencesDeBase.map((compétence, index) => (
                  <li key={index}>{compétence}</li>
                ))}
              </ul>
            </article>
            }
            <article>
              { offreAlternance.niveauRequis &&
              <span>
                <h3>Niveau Requis:</h3> { ' ' }
                <p>{offreAlternance.niveauRequis}</p>
              </span>
              }
              { offreAlternance.débutContrat &&
              <span>
                <h3>Début du contrat:</h3> { ' ' }
                <p>{offreAlternance.débutContrat}</p>
              </span>
              }
              {offreAlternance.typeDeContrats && offreAlternance.typeDeContrats.length > 0 &&
              <span>
                <h3>Type de contrat:</h3> { ' ' }
                <p>{offreAlternance.typeDeContrats.join('/')}</p>
              </span>
              }
              { offreAlternance.duréeContrat &&
              <span>
                <h3>Durée du contrat:</h3> { ' ' }
                {offreAlternance.duréeContrat}
              </span>
              }
              { offreAlternance.rythmeAlternance &&
              <span>
                <h3>Rythme de l&apos;alternance: </h3> { ' ' }
                <p>{offreAlternance.rythmeAlternance}</p>
              </span>
              }
            </article>
            { (offreAlternance.adresse || offreAlternance.contact.téléphone) &&
            <article className={commonStyles.contact}>
              <h3>Information sur l&apos;entreprise:</h3>
              <ul>
                { offreAlternance.contact &&  <li>*Adresse: {offreAlternance.adresse}</li>}
                { offreAlternance.contact.téléphone && <li>*Contact: {offreAlternance.contact.téléphone}</li>}
              </ul>
            </article>
            }
          </section>
        </article>
      </main>
    );
  }

  if (isAlternancePeJob(offreAlternance)) {
    return (
      <main id="contenu" className={commonStyles.container}>
        <article className={commonStyles.layout}>
          <header className={commonStyles.titre}>
            <Title as="h1" look="h3">{offreAlternance.intitulé}</Title>
            {offreAlternance.entreprise.nom && <h2>{offreAlternance.entreprise.nom}</h2>}
            <TagList list={offreAlternance.étiquetteList} />
          </header>
          <section className={commonStyles.contenu}>
            <Button size="md" className={commonStyles.buttonPostuler}>
              <Link
                href={offreAlternance.url}
                target="_blank"
                icon="ri-external-link-line"
                iconPosition="right"
                display="flex"
                data-testid="LinkPostulerOffreEmploi"
              >
                Postuler
              </Link>
            </Button>
            {offreAlternance.description &&
            <article>
              <h3>Description de l&apos;entreprise:</h3>
              <p dangerouslySetInnerHTML={{ __html: descriptionOffreAlternance }}/>
            </article>
            }
            <article>
              { offreAlternance.niveauRequis &&
                <span>
                  <h3>Niveau Requis:</h3> { ' ' }
                  <p>{offreAlternance.niveauRequis}</p>
                </span>
              }
              {offreAlternance.typeDeContrats && offreAlternance.typeDeContrats.length > 0 &&
                <span>
                  <h3>Type de contrat:</h3> { ' ' }
                  <p>{offreAlternance.typeDeContrats.join('/')}</p>
                </span>
              }
              { offreAlternance.duréeContrat &&
                <span>
                  <h3>Durée du contrat:</h3> { ' ' }
                  <p>{offreAlternance.duréeContrat}</p>
                </span>
              }
            </article>
            { (offreAlternance.adresse || offreAlternance.contact.téléphone) &&
              <article className={commonStyles.contact}>
                <h3>Information sur l&apos;entreprise:</h3>
                <ul>
                  { offreAlternance.adresse &&  <li>*Adresse: {offreAlternance.adresse}</li>}
                  { offreAlternance.contact.téléphone && <li>*Contact: {offreAlternance.contact.téléphone}</li>}
                </ul>
              </article>
            }
          </section>
        </article>
      </main>
    );
  }
  return null;

}
