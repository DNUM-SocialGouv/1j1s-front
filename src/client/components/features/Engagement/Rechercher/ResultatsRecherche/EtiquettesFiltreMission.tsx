import React, {
	useEffect,
	useState,
} from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';

export function EtiquettesFiltreMission() {
	const [filtreList, setFiltreList] = useState<string[]>([]);
	const missionEngagementQuery = useMissionEngagementQuery();

	useEffect(() => {
		const filtres = [];
		if (missionEngagementQuery.ouvertsAuxMineurs) filtres.push('Dès 16 ans');
		if (missionEngagementQuery.ville && missionEngagementQuery.codePostal) filtres.push(`${missionEngagementQuery.ville} (${missionEngagementQuery.codePostal})`);
		setFiltreList(filtres);
	}, [missionEngagementQuery]);

	if (!filtreList.length) {
		return null;
	}

	return (
		<TagList list={filtreList} aria-label="Filtres de la recherche"/>
	);
}
