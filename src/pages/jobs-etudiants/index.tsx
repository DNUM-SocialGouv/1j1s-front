import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherJobÉtudiant } from '~/client/components/features/JobÉtudiant/Rechercher/RechercherJobÉtudiant';

export default function RechercherJobEtudiantPage() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const queryString = stringify(router.query);
      if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
    }
  }, [router]);

  if (Object.keys(router.query).length) return <RechercherJobÉtudiant />;
  return null;

}
