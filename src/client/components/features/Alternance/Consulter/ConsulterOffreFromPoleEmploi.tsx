import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import useSanitize from '~/client/hooks/useSanitize';
import {
  ConsulterOffreAlternancePeJob,
} from '~/server/alternances/infra/repositories/alternance.type';

interface ConsulterOffreFromPoleEmploiProps {
  offreAlternance: ConsulterOffreAlternancePeJob

}

export function ConsulterOffreFromPoleEmploi(props: ConsulterOffreFromPoleEmploiProps) {
  const { offreAlternance } = props;
  const descriptionOffreAlternance = useSanitize(offreAlternance.description);

  return (
    <>
      <section className={commonStyles.contenu}>
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
            <p>{offreAlternance.typeDeContrats[0]}</p>
          </div>
          }
          { offreAlternance.duréeContrat &&
          <div>
            <h3>Durée du contrat :</h3> { ' ' }
            <p>{offreAlternance.duréeContrat}</p>
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
    </>
  );
}
