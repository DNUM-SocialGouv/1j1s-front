import React, {
  useEffect,
  useState,
} from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';

export function ÉtiquettesFiltreMission() {
  const [filtres, setFiltres] = useState<string[]>([]);
  const missionEngagementQuery = useMissionEngagementQuery();

  useEffect(() => {
    const accessibleMineur = missionEngagementQuery.ouvertsAuxMineurs ? 'Dès 16 ans': '';
    const localisation = missionEngagementQuery.libelleCommune ? missionEngagementQuery.libelleCommune: '';
    setFiltres([accessibleMineur, localisation]);
  }, [missionEngagementQuery]);

  if (!filtres.length) {
    return null;
  }

  return (
    <TagList list={filtres} aria-label="Filtres de la recherche"/>
  );
}
