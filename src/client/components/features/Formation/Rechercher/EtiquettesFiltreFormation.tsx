import React, {
	useEffect,
	useState,
} from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { useFormationQuery } from '~/client/hooks/useFormationQuery';
import { Formation } from '~/server/formations/domain/formation';

export const EtiquettesFiltreFormation = () => {
	const [filtres, setFiltres] = useState<string[]>([]);
	const formationQuery = useFormationQuery();

	useEffect(() => {
		const filtreList: string[] = [];
		if (formationQuery.ville && formationQuery.codePostal) {
			filtreList.push(`${formationQuery.ville} (${formationQuery.codePostal})`);
		}
		if (formationQuery.niveauEtudes) {
			const niveauEtudes = Formation.NIVEAU_ETUDES.find((niveau) => niveau.valeur !== 'indifférent' && niveau.valeur === formationQuery.niveauEtudes);
			if (niveauEtudes) filtreList.push(niveauEtudes.libellé);
		}
		setFiltres(filtreList);
	}, [formationQuery]);

	if (!filtres.length) return null;

	return (
		<TagList list={filtres} aria-label="Filtres de la recherche"/>
	);
};
