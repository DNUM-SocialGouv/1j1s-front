import { Title } from '@dataesr/react-dsfr';
import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.css';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { ButtonLink } from '~/client/components/ui/Button/ButtonLink';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useSanitize from '~/client/hooks/useSanitize';
// import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

interface ConsulterOffreDeStageProps {
  offreEmploi: any
}

export function ConsulterOffreDeStage({ offreEmploi }: ConsulterOffreDeStageProps) {
  const descriptionOffreDeStage = useSanitize(offreEmploi.description);
  const salaireOffreDeStage = useSanitize(offreEmploi.salaire);
  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <Title as="h1" look="h3">{offreEmploi.intitulé}</Title>
        {offreEmploi.entreprise?.nom && <h2>{offreEmploi.entreprise?.nom}</h2>}
        <TagList list={[]} aria-label="Caractéristiques de l'offre d'emploi" />
      </header>
      <section className={commonStyles.contenu}>
        <div className={commonStyles.buttonAsLink}>
          <ButtonLink
            label="Je postule sur Pôle Emploi"
            href={offreEmploi.urlDeCandidature}
            target="_blank"
            dataTestId="LinkPostulerOffreDeStage"
          />
        </div>
        {offreEmploi.description &&
        <div>
          <h3>Description du poste :</h3>
          <p dangerouslySetInnerHTML={{ __html: descriptionOffreDeStage }}/>
        </div>
        }
        {offreEmploi.remunerationBase &&
        <div>
          <h3>Salaire :</h3> { ' ' }
          <p dangerouslySetInnerHTML={{ __html: salaireOffreDeStage }}/>
        </div>
        }
      </section>
    </ConsulterOffreLayout>
  );
}
