import {
  Button,
  Link,
  Title,
} from '@dataesr/react-dsfr';
import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.css';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { TagList } from '~/client/components/ui/TagList/TagList';
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
        <Title as="h1" look="h3">{missionEngagement.titre}</Title>
        {missionEngagement.nomEntreprise && <h2>{missionEngagement.nomEntreprise}</h2>}
        <TagList data-testid="ÉtiquetteMissionEngagementList" list={missionEngagement.étiquetteList} />
      </header>
      <section className={commonStyles.contenu}>
        <Button size="md" className={commonStyles.buttonPostuler}>
          <Link
            href={missionEngagement.url}
            target="_blank"
            className="fr-btn--md fr-btn"
            icon="ri-external-link-line"
            iconPosition="right"
            display="flex"
            data-testid="LinkPostulerMissionEngagement"
          >
            Postuler
          </Link>
        </Button>
        {missionEngagement.localisation &&
          <div className={commonStyles.contenuInline}>
            <h3>Où ? </h3><p dangerouslySetInnerHTML={{ __html: localisationMissionEngagement }}/>
          </div>
        }
        {missionEngagement.description &&
          <div className={commonStyles.contenuInline}>
            <h3>Quoi ? </h3><p dangerouslySetInnerHTML={{ __html: descriptionMissionEngagement }}/>
          </div>
        }
        {missionEngagement.débutContrat &&
          <div className={commonStyles.contenuInline}>
            <h3>Quand ? </h3><p>À partir du {missionEngagement.débutContrat} {missionEngagement.duréeContrat ? `(${missionEngagement.duréeContrat} Mois)`: ''}</p>
          </div>
        }
      </section>
    </ConsulterOffreLayout>
  );
}
