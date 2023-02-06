import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export interface RésultatRechercherSolutionProps {
  lienOffre: string
  intituléOffre: string
  logoEntreprise: string
  nomEntreprise?: string
  étiquetteOffreList: string[]
}

export function RésultatRechercherSolution(props: RésultatRechercherSolutionProps) {
	const { lienOffre, intituléOffre, logoEntreprise, nomEntreprise, étiquetteOffreList } = props;
	const { isSmallScreen } = useBreakpoint();

	const cardDescription = () => {
		return (
			<section className={styles.cardDescription}>
				{étiquetteOffreList.length > 0 && <TagList list={étiquetteOffreList} aria-label="Caractéristiques de l‘offre" />}
				<TextIcon icon="angle-right" className={styles.callToAction}>En savoir plus</TextIcon>
			</section>
		);
	};

	return (
		<Link href={lienOffre} className={classNames(styles.card, 'underline-none')} prefetch={false} data-testid="RésultatRechercherSolution">
			<div className={styles.cardHeader}>
				<Image alt="" src={logoEntreprise} width={120} height={120} aria-hidden />
				<div className={styles.offreLead}>
					<header>
						<h3 className={styles.offreLeadTitle}>{intituléOffre}</h3>
						<div className={styles.offreLeadSubTitle}>{nomEntreprise && nomEntreprise}</div>
					</header>
					{ !isSmallScreen && cardDescription()}
          
				</div>
			</div>
			{ isSmallScreen && cardDescription()}
		</Link>
	);
}
