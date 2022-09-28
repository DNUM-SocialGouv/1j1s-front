import React, { useState } from 'react';

import { ConsulterOffreFromMatcha } from '~/client/components/features/Alternance/Consulter/ConsulterOffreFromMatcha';
import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { Button } from '~/client/components/ui/Button/Button';
import { TagList } from '~/client/components/ui/Tag/TagList';
import {
  ConsulterOffreAlternanceMatcha,
} from '~/server/alternances/infra/repositories/alternance.type';

interface ConsulterOffreAlternanceProps {
  offreAlternance: ConsulterOffreAlternanceMatcha
}

export function ConsulterOffreAlternance(props: ConsulterOffreAlternanceProps) {
  const { offreAlternance } = props;
  const [onClickPostuler, setOnClickPostuler] = useState(false);

  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <h1 data-testid="titre">{offreAlternance.intitulé}</h1>
        { offreAlternance.entreprise?.nom && <h2>{offreAlternance.entreprise.nom}</h2> }
        <TagList list={offreAlternance.étiquetteList} aria-label="Caractéristiques du contrat d'alternance" />
        <div className={commonStyles.buttonAsLinkWrapper}>
          <div className={commonStyles.buttonAsLink}>
            <Button
              onClick={() => setOnClickPostuler(true)}
              buttonType={'primary'}>
              Je postule
            </Button>
          </div>
        </div>
      </header>
      <ConsulterOffreFromMatcha offreAlternance={offreAlternance} isModalOpen={onClickPostuler}/>
    </ConsulterOffreLayout>
  );
}
