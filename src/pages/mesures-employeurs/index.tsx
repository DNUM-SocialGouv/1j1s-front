import { GetStaticPropsResult } from 'next';
import React from 'react';

import { MesuresEmployeursComponent, MesuresEmployeursProps } from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs';
import { dependencies } from '~/server/start';

export default function MesuresEmployeurs(props: MesuresEmployeursProps) {
  return (
    <MesuresEmployeursComponent {...props} />
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<MesuresEmployeursProps>> {
  const response = await dependencies.cmsDependencies.récupérerMesuresEmployeurs.handle();

  if (response.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }

  return {
    props: {
      mesuresEmployeurs: response.result,
    },
    revalidate: 86400, // 24 hours
  };
}

