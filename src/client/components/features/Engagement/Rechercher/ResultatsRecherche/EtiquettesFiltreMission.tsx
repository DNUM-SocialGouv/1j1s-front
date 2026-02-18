import React, {
	useMemo,
} from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';

export function EtiquettesFiltreMission() {
	const missionEngagementQuery = useMissionEngagementQuery();

	const filtreList = useMemo(() => {
		const filtres = [];
		if (missionEngagementQuery.ouvertsAuxMineurs) filtres.push('Dès 16 ans');
		if (missionEngagementQuery.ville && missionEngagementQuery.codePostal) filtres.push(`${missionEngagementQuery.ville} (${missionEngagementQuery.codePostal})`);
		return filtres;
	}, [missionEngagementQuery.codePostal, missionEngagementQuery.ouvertsAuxMineurs, missionEngagementQuery.ville]);

	if (!filtreList.length) {
		return null;
	}

	return (
		<TagList list={filtreList} aria-label="Filtres de la recherche" />
	);
}
