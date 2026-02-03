import React, { useMemo } from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { useFormationQuery } from '~/client/hooks/useFormationQuery';
import { FORMATION_NIVEAU_ETUDES } from '~/server/formations/domain/formation';

export const EtiquettesFiltreFormationAlternance = () => {
	const formationQuery = useFormationQuery();

	const filtres = useMemo(() => {
		const filtreList: string[] = [];
		if (formationQuery.ville && formationQuery.codePostal) {
			filtreList.push(`${formationQuery.ville} (${formationQuery.codePostal})`);
		}
		if (formationQuery.niveauEtudes) {
			const niveauEtudes = FORMATION_NIVEAU_ETUDES.find((niveau) => niveau.valeur !== 'indifférent' && niveau.valeur === formationQuery.niveauEtudes);
			if (niveauEtudes) filtreList.push(niveauEtudes.libellé);
		}
		return filtreList;
	}, [formationQuery.codePostal, formationQuery.niveauEtudes, formationQuery.ville]);

	if (!filtres.length) return null;

	return (
		<TagList list={filtres} aria-label="Filtres de la recherche" />
	);
};
