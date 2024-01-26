import classNames from 'classnames';
import Image from 'next/image';
import React, { PropsWithChildren, ReactNode, useId } from 'react';

import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useBreakpoint from '~/client/hooks/useBreakpoint';

type LogoProps = ({ logo?: never, logoAlt?: never} | { logo: string, logoAlt?: string })
type RésultatRechercherSolutionProps = {
	lienOffre?: string;
	intituléOffre: string | ReactNode;
	intituléLienOffre?: string;
	sousTitreOffre?: string | ReactNode;
	étiquetteOffreList: Array<string | undefined>;
} & Partial<HTMLElement> & LogoProps;

export function RésultatRechercherSolution(props: PropsWithChildren<RésultatRechercherSolutionProps>) {
	const { lienOffre, intituléOffre, intituléLienOffre, logo, sousTitreOffre, étiquetteOffreList, children, logoAlt= '', className } = props;
	const { isSmallScreen } = useBreakpoint();
	const idLink = useId();
	const idIntitulé = useId();

	const cardTagsAndCTA = () => {
		return (
			<section className={styles.cardTagsAndCTA}>
				{étiquetteOffreList.length > 0 &&
					<TagList list={étiquetteOffreList} aria-label="Caractéristiques de l‘offre"/>}

				{lienOffre &&
					// NOTE (BRUJ 31-03-2023): L‘intégralité de la carte est cliquable grâce aux propriétés CSS
					<div className={styles.cardLinkContainer}>
						<LinkStyledAsButtonWithIcon
							id={idLink}
							className={classNames(styles.cardLink)}
							href={lienOffre}
							icon={<Icon name={'angle-right'}/>}
							iconPosition={'right'}
							appearance={'asQuaternaryButton'}
							aria-labelledby={intituléLienOffre ? undefined : `${idIntitulé} ${idLink}`}
						>
							{intituléLienOffre || 'En savoir plus'}
						</LinkStyledAsButtonWithIcon>
					</div>
				}
			</section>
		);
	};

	return (
		<div
			className={classNames(styles.card, className)}
			data-testid="RésultatRechercherSolution">
			<div className={classNames(styles.cardLead, logo && styles.logoCardLead)}>
				{ logo && <Image alt={logoAlt} src={logo} width={120} height={120}/>}
				<div className={styles.offreLead}>
					<header>
						<h3 id={idIntitulé} className={styles.title}>{intituléOffre}</h3>
						{sousTitreOffre && <div className={styles.subtitle}>{sousTitreOffre}</div>}
					</header>
					{children && <section className={styles.offreLeadDescription}>{children}</section>}
					{!isSmallScreen && cardTagsAndCTA()}
				</div>
			</div>
			{isSmallScreen && cardTagsAndCTA()}
		</div>
	);
}
