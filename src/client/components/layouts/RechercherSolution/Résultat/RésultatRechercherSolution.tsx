import classNames from 'classnames';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export interface RésultatRechercherSolutionProps {
	lienOffre?: string
	intituléOffre: string
	intituléLienOffre?: string
	logo: string
	sousTitreOffre?: string
	étiquetteOffreList: string[]
}

export function RésultatRechercherSolution(props: PropsWithChildren<RésultatRechercherSolutionProps>) {
	const { lienOffre, intituléOffre, intituléLienOffre, logo, sousTitreOffre, étiquetteOffreList, children } = props;
	const { isSmallScreen } = useBreakpoint();

	const cardTagsAndCTA = () => {
		return (
			<section className={styles.cardTagsAndCTA}>
				{étiquetteOffreList.length > 0 &&
            <TagList list={étiquetteOffreList} aria-label="Caractéristiques de l‘offre"/>}
				{lienOffre &&
				// NOTE (BRUJ 31-03-2023): L‘intégralité de la carte est cliquable grâce aux propriétés CSS
            <div className={styles.cardLinkContainer}>
            	<Link
            		href={lienOffre}
            		className={classNames(styles.cardLink, 'underline-none')}
            		prefetch={false}>
            		<TextIcon icon="angle-right" className={styles.cardLinkCallToAction}>
            			{intituléLienOffre ? intituléLienOffre : 'En savoir plus'}
            		</TextIcon>
            	</Link>
            </div>
				}
			</section>
		);
	};

	return (
		<div
			className={styles.card}
			data-testid="RésultatRechercherSolution">
			<div className={styles.cardLead}>
				<Image alt="" src={logo} width={120} height={120}/>
				<div className={styles.offreLead}>
					<header>
						<h3 className={styles.offreLeadTitle}>{intituléOffre}</h3>
						{sousTitreOffre && <div className={styles.offreLeadSubTitle}>{sousTitreOffre}</div>}
					</header>
					{children && <section className={styles.offreLeadDescription}>{children}</section>}
					{!isSmallScreen && cardTagsAndCTA()}
				</div>
			</div>
			{isSmallScreen && cardTagsAndCTA()}
		</div>
	);
}
