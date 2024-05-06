import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

import styles from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier.module.scss';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import useSanitize from '~/client/hooks/useSanitize';
import { formatCarriageReturnToHtml } from '~/client/utils/formatCarriageReturnToHtml';
import { mapFicheMetier } from '~/server/fiche-metier/domain/ficheMetierHttp';
import { StrapiFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier';

// NOTE (BRUJ 06/05/2024): Pour éviter les hydratation mismatch lié au usebreakpoint on désactive le srr sur des composants spécifiques cf https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const RésultatRechercherSolution = dynamic(() => import('~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution').then((mod) => mod.RésultatRechercherSolution), { ssr: false });

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
