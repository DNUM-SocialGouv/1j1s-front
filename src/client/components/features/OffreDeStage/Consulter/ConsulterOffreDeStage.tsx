import { Title } from '@dataesr/react-dsfr';
import { marked } from 'marked';
import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { OffreDeStageAttributesFromCMS } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';

interface ConsulterOffreDeStageProps {
  offreDeStage: OffreDeStageAttributesFromCMS
}

export function ConsulterOffreDeStage({ offreDeStage }: ConsulterOffreDeStageProps) {
  const afficheNomEmployeur = (nomEmployeur?: string) => {
    if(nomEmployeur) {
      return <h2>${nomEmployeur}</h2>;
    }
    return <></>;
  };
    
  const salaireOffreDeStage = offreDeStage.remunerationBase?.toString();
  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <Title as="h1" look="h3">{offreDeStage.titre}</Title>
        {afficheNomEmployeur(offreDeStage.employeur?.nom)}
        <TagList list={[]} aria-label="Caractéristiques de l'offre d'emploi" />
      </header>
      <section className={commonStyles.contenu}>
        <div className={commonStyles.buttonAsLink}>
          <LinkAsButton
            href={offreDeStage.urlDeCandidature}
            target="_blank">
            {`Je postule sur ${offreDeStage.source}`}
          </LinkAsButton>
        </div>
        {offreDeStage.description &&
        <div>
          <h3>Description du poste :</h3>
          <p dangerouslySetInnerHTML={{ __html: marked.parse(offreDeStage.description) }}/>
        </div>
        }
        {offreDeStage.remunerationBase &&
        <div>
          <h3>Salaire :</h3> { ' ' }
          <p> {salaireOffreDeStage } €</p>
        </div>
        }
      </section>
    </ConsulterOffreLayout>
  );
}
