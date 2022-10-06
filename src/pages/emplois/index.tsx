import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import useReferrer from '~/client/hooks/useReferrer';

export default function RechercherOffreEmploiPage() {
  const router = useRouter();
  useReferrer();

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
  }, [router]);

  if (Object.keys(router.query).length) return <RechercherOffreEmploi />;
  return null;
}
