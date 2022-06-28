import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.css';
import useSanitize from '~/client/hooks/useSanitize';
import { AlternanceFromMatcha } from '~/server/alternances/infra/repositories/alternance.type';

interface ConsulterOffreFromMatchaProps {
  offreAlternance: AlternanceFromMatcha
}

export function ConsulterOffreFromMatcha(props: ConsulterOffreFromMatchaProps) {
  const { offreAlternance } = props;
  const descriptionOffreAlternance = useSanitize(offreAlternance.description);

  return (
    <section className={commonStyles.contenu}>
      {offreAlternance.description &&
      <div>
        <h3>Description du poste :</h3>
        <p dangerouslySetInnerHTML={{ __html: descriptionOffreAlternance }}/>
      </div>
      }
      {offreAlternance.competencesDeBase && offreAlternance.competencesDeBase.length > 0 &&
      <div>
        <h3>Compétences visées :</h3>
        <ul className={commonStyles.competences}>
          { offreAlternance.competencesDeBase.map((compétence, index) => (
            <li key={index}>{compétence}</li>
          ))}
        </ul>
      </div>
      }
      <div className={commonStyles.informations}>
        { offreAlternance.niveauRequis &&
        <div>
          <h3>Niveau requis :</h3> { ' ' }
          <p>{offreAlternance.niveauRequis}</p>
        </div>
        }
        {offreAlternance.typeDeContrats && offreAlternance.typeDeContrats.length > 0 &&
        <div>
          <h3>Type de contrat :</h3> { ' ' }
          <p>{offreAlternance.typeDeContrats.join('/')}</p>
        </div>
        }
        {offreAlternance.débutContrat  &&
        <div>
          <h3>Début du contrat :</h3> { ' ' }
          <p>{offreAlternance.débutContrat}</p>
        </div>
        }
        { offreAlternance.duréeContrat &&
        <div>
          <h3>Durée du contrat :</h3> { ' ' }
          <p>{offreAlternance.duréeContrat} an(s)</p>
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
