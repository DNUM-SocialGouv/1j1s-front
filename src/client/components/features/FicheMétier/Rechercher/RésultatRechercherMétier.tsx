import React, { useMemo } from 'react';

import styles from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier.module.scss';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import useSanitize from '~/client/hooks/useSanitize';
import { formatCarriageReturnToHtml } from '~/client/utils/formatCarriageReturnToHtml';
import { mapFicheMetier } from '~/server/fiche-metier/domain/ficheMetierHttp';
import { StrapiFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier';


export function RésultatRechercherMétier(props: HitProps<Partial<StrapiFicheMetier>>) {
	const ficheMetier = mapFicheMetier(props.hit);
	const accrocheMétier = useSanitize(formatCarriageReturnToHtml(ficheMetier.accrocheMetier));
	const nomMetier = useMemo(() => {
		return `${ficheMetier.nomMetier?.charAt(0).toUpperCase()}${ficheMetier.nomMetier?.slice(1)}`;
	}, [ficheMetier.nomMetier]);

	if (!ficheMetier.nomMetier) return null;

	return (
		<RésultatRechercherSolution intituléOffre={nomMetier} étiquetteOffreList={[]} lienOffre={`/decouvrir-les-metiers/${encodeURIComponent(ficheMetier.nomMetier)}`}>
			<div className={styles.description} dangerouslySetInnerHTML={{ __html: accrocheMétier || '' }}/>
		</RésultatRechercherSolution>
	);
}
