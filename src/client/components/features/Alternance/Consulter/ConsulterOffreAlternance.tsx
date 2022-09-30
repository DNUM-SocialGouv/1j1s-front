import React, { useState } from 'react';

import { ConsulterOffreFromMatcha } from '~/client/components/features/Alternance/Consulter/ConsulterOffreFromMatcha';
import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { TagList } from '~/client/components/ui/Tag/TagList';
import {
  ConsulterOffreAlternanceMatcha,
} from '~/server/alternances/infra/repositories/alternance.type';

interface ConsulterOffreAlternanceProps {
  offreAlternance: ConsulterOffreAlternanceMatcha
}

export function ConsulterOffreAlternance(props: ConsulterOffreAlternanceProps) {
  const { offreAlternance } = props;
  const [isModalPostulerOpen, setIsModalPostulerOpen] = useState<boolean>(false);

  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <h1>{offreAlternance.intitulé}</h1>
        { offreAlternance.entreprise?.nom && <h2>{offreAlternance.entreprise.nom}</h2> }
        <TagList list={offreAlternance.étiquetteList} aria-label="Caractéristiques du contrat d'alternance" />
        <div className={commonStyles.buttonAsLinkWrapper}>
          <div className={commonStyles.buttonAsLink}>
            <ButtonComponent
              label='Je postule'
              onClick={() => setIsModalPostulerOpen(true)}
            />
          </div>
        </div>
      </header>
      <ConsulterOffreFromMatcha
        offreAlternance={offreAlternance}
        isModalPostulerOpen={isModalPostulerOpen}
        setIsModalPostulerOpen={setIsModalPostulerOpen}
      />
    </ConsulterOffreLayout>
  );
}
