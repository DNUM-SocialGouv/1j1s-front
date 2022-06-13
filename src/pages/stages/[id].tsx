import axios from 'axios';
import { marked } from 'marked';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ConsulterOffreStagePageProps {
  offreStage: {
    titre: string,
    description: string
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConsulterOffreStagePage(props: ConsulterOffreStagePageProps) {
  const router = useRouter();
  const changeValueAfterThreeSeconds = async () => {
    const { id } = router.query;

    if (!id) {
      return;
    }

    console.log(router.query);
    const result = await axios.get('http://localhost:1337/api/stages/'+id, {});
    setStage(result.data.data.attributes);
    setIsLoaded(true);
  };

  const [stage, setStage] = useState<{ titre: string, description: string }>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    changeValueAfterThreeSeconds();
  });

  return (
    <>

      <div>
        {/*/!* Bon ici ça n'affiche pas direct le html mais une string *!/*/}
        {/*{ (isLoaded && <article> <h1>{stage!.titre}</h1><section>{marked.parse(stage!.description)}</section></article>) || 'Loading...' }*/}

        {/*Méthode 2 avec ReactMarkdown qui nettoie tout et affiche automatiquement */}
        { (isLoaded && <article> <h1>{stage!.titre}</h1><section><ReactMarkdown>{ stage!.description }</ReactMarkdown></section></article>) || 'Loading...' }

      </div>
    </>
  );
}

