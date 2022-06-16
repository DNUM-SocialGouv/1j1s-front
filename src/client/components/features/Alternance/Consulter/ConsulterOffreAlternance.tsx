import {
  Title,
} from '@dataesr/react-dsfr';
import React from 'react';

import { ConsulterOffreFromMatcha } from '~/client/components/features/Alternance/Consulter/ConsulterOffreFromMatcha';
import { ConsulterOffreFromPoleEmploi } from '~/client/components/features/Alternance/Consulter/ConsulterOffreFromPoleEmploi';
import commonStyles from '~/client/components/features/ConsulterOffre.module.css';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { TagList } from '~/client/components/ui/TagList/TagList';
import {
  AlternanceFromMatcha,
  AlternanceFromPoleEmploi,
  RésultatRechercheAlternance,
} from '~/server/alternances/infra/repositories/alternance.type';

interface ConsulterOffreAlternanceProps {
  offreAlternance: RésultatRechercheAlternance
}

export function ConsulterOffreAlternance(props: ConsulterOffreAlternanceProps) {
  const { offreAlternance } = props;

  function isAlternanceFromPoleEmploi(alternance: RésultatRechercheAlternance): alternance is AlternanceFromPoleEmploi {
    return alternance.from === 'peJob';
  }

  function isAlternanceFromMatcha(alternance: RésultatRechercheAlternance): alternance is AlternanceFromMatcha {
    return alternance.from ===  'matcha';
  }


  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <Title as="h1" look="h3" data-testid="titre">{offreAlternance.intitulé}</Title>
        { offreAlternance.entreprise?.nom && <h2>{offreAlternance.entreprise.nom}</h2>}

        <TagList list={offreAlternance.étiquetteList} data-testid="ÉtiquetteOffreAlternanceList"/>
      </header>
      { isAlternanceFromPoleEmploi(offreAlternance) && <ConsulterOffreFromPoleEmploi offreAlternance={offreAlternance} />}
      { isAlternanceFromMatcha(offreAlternance) && <ConsulterOffreFromMatcha offreAlternance={offreAlternance} />}
    </ConsulterOffreLayout>
  );
}
