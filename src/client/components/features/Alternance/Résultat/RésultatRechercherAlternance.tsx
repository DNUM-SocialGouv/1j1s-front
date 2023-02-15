import classNames from 'classnames';
import Image from 'next/image';
import React, { useMemo } from 'react';

import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { Alternance } from '~/server/alternances/domain/alternance';

export interface RésultatRechercherAlternanceProps {
	alternance: Alternance
}


export function RésultatRechercherAlternance(props: RésultatRechercherAlternanceProps) {
	const { alternance } = props;
	const { isSmallScreen } = useBreakpoint();
	const getLogo : string = useMemo(() =>  {
		if (alternance.source === Alternance.Source.MATCHA) {
			return '/images/logos/la-bonne-alternance.svg';
		}
		return '/images/logos/pole-emploi.svg';
	}, [alternance]);


	return (
		<div className={classNames(styles.card, 'underline-none')}>
			<div className={styles.cardHeader}>
				<Image alt="" src={getLogo} width={120} height={120}/>
				<div className={styles.offreLead}>
					<header>
						<h3 className={styles.offreLeadTitle}>{alternance.titre}</h3>
						<div className={styles.offreLeadSubTitle}>{alternance.nomEntreprise && alternance.nomEntreprise}</div>
					</header>
					{!isSmallScreen && <CardDescription étiquetteList={alternance.tags}/>}
				</div>
			</div>
			{isSmallScreen && <CardDescription étiquetteList={alternance.tags}/>}
		</div>
	);
}


function CardDescription(props: { étiquetteList: (string)[] }) {
	const { étiquetteList } = props;
	return (
		<section className={styles.cardDescription}>
			{étiquetteList.length > 0 && <TagList list={étiquetteList} aria-label="Caractéristiques de l‘offre"/>}
		</section>
	);
}
