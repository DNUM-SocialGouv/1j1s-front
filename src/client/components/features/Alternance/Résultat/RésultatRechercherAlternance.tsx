import classNames from 'classnames';
import Image from 'next/image';
import React, { useMemo } from 'react';

import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { Alternance } from '~/server/alternances/domain/alternance';
import Source = Alternance.Source;

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
		<Link href={alternance.source === Source.MATCHA ? `/apprentissage/${alternance.id}` : '#'} className={classNames(styles.card, 'underline-none')}>
			<div className={styles.cardHeader}>
				<Image alt="" src={getLogo} width={120} height={120}/>
				<div className={styles.offreLead}>
					<header>
						<h3 className={styles.offreLeadTitle}>{alternance.titre}</h3>
						<div className={styles.offreLeadSubTitle}>{alternance.entreprise.nom && alternance.entreprise.nom}</div>
					</header>
					{!isSmallScreen && <CardDescription étiquetteList={alternance.tags} source={alternance.source} />}
				</div>
			</div>
			{isSmallScreen && <CardDescription étiquetteList={alternance.tags} source={alternance.source} />}
		</Link>
	);
}


function CardDescription(props: { étiquetteList: (string)[], source: Source }) {
	const { étiquetteList, source } = props;
	return (
		<section className={styles.cardDescription}>
			{étiquetteList.length > 0 && <TagList list={étiquetteList} aria-label="Caractéristiques de l‘offre"/>}
			{source === Source.MATCHA && <TextIcon icon={'angle-right'} className={styles.callToAction}>En savoir plus</TextIcon>}
		</section>
	);
}
