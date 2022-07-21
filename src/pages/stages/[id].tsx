import axios from 'axios';
import { marked } from 'marked';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {ConsulterOffreDeStage} from "~/client/components/features/OffreDeStage/Consulter/ConsulterOffreEmploi";

interface ConsulterOffreStagePageProps {
  offreStage: {
    titre: string,
    description: string
  };
}

export default function ConsulterOffreStagePage() {
  const router = useRouter();
  const  chargerOffreDeStage = async (slug: string) => {
    const result = await axios.get('http://localhost:1337/api/slugify/slugs/offre-de-stage/'+slug)
    setStage(result.data.data.attributes);
    setIsLoaded(true);
  };

  const [stage, setStage] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  //if (!offreStage) return null;
  useEffect( ()=>{
    const { id } = router.query;
    if(id && !stage) {
      chargerOffreDeStage(id);
    }
  });
  if (!isLoaded) {
    return (<p>loading</p>)
  }
  return (
      <ConsulterOffreDeStage offreEmploi={stage}></ConsulterOffreDeStage>
  );
}
