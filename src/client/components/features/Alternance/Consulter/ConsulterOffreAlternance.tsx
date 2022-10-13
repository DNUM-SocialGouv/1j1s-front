import React, { useState } from 'react';

import { ConsulterOffreFromMatcha } from '~/client/components/features/Alternance/Consulter/ConsulterOffreFromMatcha';
import { ConsulterOffreFromPoleEmploi } from '~/client/components/features/Alternance/Consulter/ConsulterOffreFromPoleEmploi';
import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';
import {
  ConsulterOffreAlternance as ConsulterOffreAlternanceType,
  ConsulterOffreAlternanceMatcha,
  ConsulterOffreAlternancePeJob,
} from '~/server/alternances/infra/repositories/alternance.type';

interface ConsulterOffreAlternanceProps {
  offreAlternance: ConsulterOffreAlternanceType
}

export function ConsulterOffreAlternance(props: ConsulterOffreAlternanceProps) {
  const { offreAlternance } = props;
  const [isModalPostulerOpen, setIsModalPostulerOpen] = useState<boolean>(false);

  function isAlternanceFromPoleEmploi(alternance: ConsulterOffreAlternanceType): alternance is ConsulterOffreAlternancePeJob {
    return alternance.from === 'peJob';
  }

  function isAlternanceFromMatcha(alternance: ConsulterOffreAlternanceType): alternance is ConsulterOffreAlternanceMatcha {
    return alternance.from ===  'matcha';
  }
  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <h1>{offreAlternance.intitulé}</h1>
        { offreAlternance.entreprise?.nom && <h2>{offreAlternance.entreprise.nom}</h2> }
        <TagList list={offreAlternance.étiquetteList} aria-label="Caractéristiques du contrat d'alternance" />
        <div className={commonStyles.buttonAsLinkWrapper}>
          <div className={commonStyles.buttonAsLink}>
            { isAlternanceFromPoleEmploi(offreAlternance) &&
            <LinkAsButton
              href={offreAlternance.url}
              target="_blank"
            >
              Je postule sur Pôle Emploi
            </LinkAsButton>
            }
            {isAlternanceFromMatcha(offreAlternance) &&
            <ButtonComponent
              label='Je postule'
              onClick={() => setIsModalPostulerOpen(true)}
            />
            }
          </div>
        </div>
      </header>
      { isAlternanceFromPoleEmploi(offreAlternance) && <ConsulterOffreFromPoleEmploi offreAlternance={offreAlternance} />}
      { isAlternanceFromMatcha(offreAlternance) &&
      <ConsulterOffreFromMatcha
        offreAlternance={offreAlternance}
        isModalPostulerOpen={isModalPostulerOpen}
        setIsModalPostulerOpen={setIsModalPostulerOpen}
      />
      }

    </ConsulterOffreLayout>
  );
}
