import {
  Button,
  Link,
} from '@dataesr/react-dsfr';
import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.css';
import useSanitize from '~/client/hooks/useSanitize';
import {
  AlternanceFromPoleEmploi,
} from '~/server/alternances/domain/alternance';

interface ConsulterOffreFromPoleEmploiProps {
  offreAlternance: AlternanceFromPoleEmploi
}

export function ConsulterOffreFromPoleEmploi(props: ConsulterOffreFromPoleEmploiProps) {
  const { offreAlternance } = props;
  const descriptionOffreAlternance = useSanitize(offreAlternance.description);

  return (
    <section className={commonStyles.contenu}>
      <Button size="md" className={commonStyles.buttonPostuler}>
        <Link
          href={offreAlternance.url}
          target="_blank"
          icon="ri-external-link-line"
          iconPosition="right"
          display="flex"
          data-testid="LinkPostuler"
        >
          Postuler
        </Link>
      </Button>
      {offreAlternance.description &&
      <div>
        <h3>Description de l&apos;entreprise :</h3>
        <p dangerouslySetInnerHTML={{ __html: descriptionOffreAlternance }}/>
      </div>
      }
      <div className={commonStyles.informations}>
        { offreAlternance.niveauRequis &&
        <div>
          <h3>Niveau Requis :</h3> { ' ' }
          <p>{offreAlternance.niveauRequis}</p>
        </div>
        }
        {offreAlternance.typeDeContrats && offreAlternance.typeDeContrats.length > 0 &&
        <div>
          <h3>Type de contrat :</h3> { ' ' }
          <p>{offreAlternance.typeDeContrats.join('/')}</p>
        </div>
        }
        { offreAlternance.duréeContrat &&
        <div>
          <h3>Durée du contrat :</h3> { ' ' }
          <p>{offreAlternance.duréeContrat}</p>
        </div>
        }
      </div>
      { (offreAlternance.adresse || offreAlternance.contact.téléphone) &&
      <address className={commonStyles.contact}>
        <h3>Information sur l&apos;entreprise :</h3>
        <ul>
          { offreAlternance.adresse &&  <li>Adresse : {offreAlternance.adresse}</li>}
          { offreAlternance.contact.téléphone && <li>Contact : {offreAlternance.contact.téléphone}</li>}
        </ul>
      </address>
      }
    </section>
  );
}
