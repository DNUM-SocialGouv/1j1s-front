import { GetStaticPropsResult } from 'next';

import { MesuresJeunesComponent } from '~/client/components/features/MesuresJeunes/MesuresJeunes';
import { MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';
import { dependencies } from '~/server/start';


interface MesuresJeunesPageProps {
  mesuresJeunes : MesuresJeunes
}

export default function MesuresJeunesPage({ mesuresJeunes }: MesuresJeunesPageProps) {
  if (!mesuresJeunes) return null;
  
  return (
    <MesuresJeunesComponent mesuresJeunes={ mesuresJeunes } />
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<MesuresJeunesPageProps>> {
  const response = await dependencies.mesuresJeunesDependencies.récupérerMesuresJeunes.handle();

  if (response.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }

  return {
    props: {
      mesuresJeunes: JSON.parse(JSON.stringify(response.result)),
    },
    revalidate: 86400,
  };
}

