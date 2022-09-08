import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isArray } from 'util';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import { OffreDeStageDétail } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { UnavailableOffer } from '~/client/components/features/OffreDeStage/OffreDeStageIndisponible';
import { Container } from '~/client/components/layouts/Container/Container';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import indexServices from '~/client/services/index.service';

const recupérerOffreDeStage = async (slug: string | string[]) => {
  if (isArray(slug)) {
    throw new Error();
  }

  const response = await indexServices.offreDeStage.get(slug);
  return response;
};

export default function ConsulterOffreStagePage() {
  const router = useRouter();
  const chargerOffreDeStage = async (slug: string | string[]): Promise<OffreDeStageDétail> => {
    const offreDeStage = await recupérerOffreDeStage(slug);
    return offreDeStage;
  };

  const [offreDeStage, setOffreDeStage] = useState<OffreDeStageDétail>();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const { id } = router.query;
    if (!id) {
      return;
    }
    // serviceOffreDeStage.getOffreDeStage(id as string)
    chargerOffreDeStage(id)
      .then((offreDeStage) => {
        setOffreDeStage(offreDeStage);
      })
      .catch(() => {
        setIsLoaded(true);
      })
      .finally(() => setIsLoaded(true));

  },
  [router.query]);
  if (!isLoaded) {
    return (<Container><p>loading</p></Container>);
  }
  if ((!offreDeStage)) {
    return <UnavailableOffer/>;
  }
  return (
    <Container>
      <HeadTag title={`${offreDeStage.titre} | 1jeune1solution`} />
      <ConsulterOffreDeStage offreDeStage={offreDeStage}/>
    </Container>
  );
}
