import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreEmploi';
import {
  OffreDeStageAttributesFromCMS,
  OffreDeStageInternalService,
} from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { ErrorMessageComponent } from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent';

export default function ConsulterOffreStagePage() {
  const router = useRouter();
  const chargerOffreDeStage = async (slug: string | string[]) => {
    const result = await axios.get<OffreDeStageInternalService>('http://localhost:1337/api/slugify/slugs/offre-de-stage/'+slug);
    setOffreDeStage(result.data.data.attributes);
    setIsLoaded(true);
  };

  const [offreDeStage, setOffreDeStage] = useState<OffreDeStageAttributesFromCMS>();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect( ()=>{
    const { id } = router.query;
    if(id) {
      try {
        chargerOffreDeStage(id);
      }
      finally {
        setIsLoaded(true);
      }
    }
  },[router.query]);
  if (!isLoaded) {
    return (<p>loading</p>);
  }
  if((!offreDeStage)) {
    return <ErrorMessageComponent
      title="Page non trouvée"
      explanationText="La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée."
      solutionText="Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil, ou effectuer une recherche avec notre moteur de recherche en haut de page. Sinon contactez-nous pour que l’on puisse vous rediriger vers la bonne information." />;
  }
  return (
    <ConsulterOffreDeStage offreDeStage={offreDeStage}></ConsulterOffreDeStage>
  );
}
