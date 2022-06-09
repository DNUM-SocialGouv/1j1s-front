import React from 'react';

import { HeadTag } from '~/client/components/utils/HeaderTag';

interface ConsulterOffreStagePageProps {
  offreStage: {
    titre: string,
    description: string
  };
}

export default function ConsulterOffreStagePage(props: ConsulterOffreStagePageProps) {
  const { offreStage } = props;

  if (!offreStage) return null;

  return (
    <>
      toto
      <HeadTag title={`${offreStage.titre} | 1jeune1solution`} />
      <div>
        <p>
          {offreStage.titre}
        </p>
        <p>
          {offreStage.description}
        </p>
      </div>
    </>
  );
}

