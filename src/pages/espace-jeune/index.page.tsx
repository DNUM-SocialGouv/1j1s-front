import { GetStaticPropsResult } from 'next';

import { EspaceJeuneComponent } from '~/client/components/features/EspaceJeune/EspaceJeune';
import useReferrer from '~/client/hooks/useReferrer';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { dependencies } from '~/server/start';


interface EspaceJeunePageProps {
  espaceJeune : EspaceJeune
}

export default function EspaceJeunePage({ espaceJeune }: EspaceJeunePageProps) {
  useReferrer();
  
  return (
    <EspaceJeuneComponent espaceJeune={ espaceJeune } />
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<EspaceJeunePageProps>> {
  const response = await dependencies.cmsDependencies.récupérerEspaceJeune.handle();

  if (response.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }

  return {
    props: {
      espaceJeune: JSON.parse(JSON.stringify(response.result)),
    },
    revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
  };
}

