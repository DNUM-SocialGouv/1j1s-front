import { Title } from '@dataesr/react-dsfr';
import React from 'react';

import { ConsulterOffreFromMatcha } from '~/client/components/features/Alternance/Consulter/ConsulterOffreFromMatcha';
import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { TagList } from '~/client/components/ui/Tag/TagList';
import {
  ConsulterOffreAlternanceMatcha,
} from '~/server/alternances/infra/repositories/alternance.type';

interface ConsulterOffreAlternanceProps {
  offreAlternance: ConsulterOffreAlternanceMatcha
}

export function ConsulterOffreAlternance(props: ConsulterOffreAlternanceProps) {
  const { offreAlternance } = props;

  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <Title as="h1" look="h3" data-testid="titre">{offreAlternance.intitulé}</Title>
        { offreAlternance.entreprise?.nom && <h2>{offreAlternance.entreprise.nom}</h2> }
        <TagList list={offreAlternance.étiquetteList} aria-label="Caractéristiques du contrat d'alternance" />
      </header>
      <ConsulterOffreFromMatcha offreAlternance={offreAlternance} />
    </ConsulterOffreLayout>
  );
}
