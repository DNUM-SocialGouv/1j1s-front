import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import { Mission } from '~/server/engagement/domain/engagement';

interface ConsulterMissionEngagementProps {
  missionEngagement: Mission
}

export function ConsulterMissionEngagement({ missionEngagement }: ConsulterMissionEngagementProps) {
  const descriptionMissionEngagement = useSanitize(missionEngagement.description);
  const localisationMissionEngagement = useSanitize(missionEngagement.localisation);

  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <h1>{missionEngagement.titre}</h1>
        {missionEngagement.nomEntreprise && <h2>{missionEngagement.nomEntreprise}</h2>}
        <TagList list={missionEngagement.étiquetteList} aria-label="Caractéristiques de la mission" />
      </header>
      <section className={commonStyles.contenu}>
        <div className={commonStyles.buttonAsLink}>
          <LinkAsButton
            href={missionEngagement.url}
            target="_blank"
          >
            Postuler
          </LinkAsButton>
        </div>
        {missionEngagement.localisation &&
          <div className={commonStyles.contenuAdaptatif}>
            <h3>Où ? </h3><p dangerouslySetInnerHTML={{ __html: localisationMissionEngagement }}/>
          </div>
        }
        {missionEngagement.description &&
          <div className={commonStyles.contenuAdaptatif}>
            <h3>Quoi ? </h3><p dangerouslySetInnerHTML={{ __html: descriptionMissionEngagement }}/>
          </div>
        }
        {missionEngagement.débutContrat &&
          <div className={commonStyles.contenuAdaptatif}>
            <h3>Quand ? </h3><p>À partir du {missionEngagement.débutContrat} {missionEngagement.duréeContrat ? `(${missionEngagement.duréeContrat} Mois)`: ''}</p>
          </div>
        }
      </section>
    </ConsulterOffreLayout>
  );
}
