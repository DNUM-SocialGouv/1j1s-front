import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.css';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import useSanitize from '~/client/hooks/useSanitize';
import { AlternanceFromPoleEmploi } from '~/server/alternances/infra/repositories/alternance.type';

interface ConsulterOffreFromPoleEmploiProps {
  offreAlternance: AlternanceFromPoleEmploi
}

export function ConsulterOffreFromPoleEmploi(props: ConsulterOffreFromPoleEmploiProps) {
  const { offreAlternance } = props;
  const descriptionOffreAlternance = useSanitize(offreAlternance.description);

  return (
    <section className={commonStyles.contenu}>
      <div className={commonStyles.buttonAsLink}>
        <LinkAsButton
          label="Je postule sur Pôle Emploi"
          href={offreAlternance.url}
          target="_blank"
          dataTestId="LinkPostulerOffreEmploi"
        />
      </div>
      {offreAlternance.description &&
      <div>
        <h3>Description du poste :</h3>
        <p dangerouslySetInnerHTML={{ __html: descriptionOffreAlternance }}/>
      </div>
      }
      <div className={commonStyles.informations}>
        { offreAlternance.niveauRequis &&
        <div>
          <h3>Nature du contrat :</h3> { ' ' }
          <p>{offreAlternance.niveauRequis}</p>
        </div>
        }
        {offreAlternance.typeDeContrats && offreAlternance.typeDeContrats.length > 0 &&
        <div>
          <h3>Type de contrat :</h3> { ' ' }
          <p>{offreAlternance.typeDeContrats[0]}</p>
        </div>
        }
        { offreAlternance.duréeContrat &&
        <div>
          <h3>Durée du contrat :</h3> { ' ' }
          <p>{offreAlternance.duréeContrat}</p>
        </div>
        }
        { offreAlternance.rythmeAlternance &&
          <div>
            <h3>Rythme de l&apos;alternance : </h3> { ' ' }
            <p>{offreAlternance.rythmeAlternance}</p>
          </div>
        }
      </div>
      { (offreAlternance.adresse || offreAlternance.contact?.téléphone) &&
      <address className={commonStyles.contact}>
        <h3>Information sur l&apos;entreprise :</h3>
        <ul>
          { offreAlternance.adresse &&  <li>Adresse : {offreAlternance.adresse}</li>}
          { offreAlternance.contact?.téléphone && <li>Contact : {offreAlternance.contact.téléphone}</li>}
        </ul>
      </address>
      }
    </section>
  );
}
