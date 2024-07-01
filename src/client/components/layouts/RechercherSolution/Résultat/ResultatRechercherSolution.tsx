import classNames from 'classnames';
import React, { PropsWithChildren, ReactNode, useId } from 'react';

import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { Image } from '~/client/components/ui/Img';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';

type LogoProps = ({ logo?: never, logoAlt?: never } | { logo: string, logoAlt?: string })
type ResultatRechercherSolutionProps = {
	lienOffre?: string;
	intituléOffre: string | ReactNode;
	intituléLienOffre?: string;
	sousTitreOffre?: string | ReactNode;
	étiquetteOffreList: Array<string>;
} & React.HTMLAttributes<HTMLElement> & LogoProps;

export function ResultatRechercherSolution(props: PropsWithChildren<ResultatRechercherSolutionProps>) {
	const {
		lienOffre,
		intituléOffre,
		intituléLienOffre,
		logo,
		sousTitreOffre,
		étiquetteOffreList,
		children,
		logoAlt = '',
		className,
	} = props;
	const idLink = useId();
	const idIntitulé = useId();

	return (
		<div
			className={classNames(styles.card, className)}
			// TODO (BRUJ 01/07/2024): supprimer ce testid
			data-testid="RésultatRechercherSolution">

			{logo && <Image alt={logoAlt} src={logo} width={120} height={120}/>}

			<div className={styles.mainContent}>
				<header>
					<h3 id={idIntitulé} className={styles.title}>{intituléOffre}</h3>
					{sousTitreOffre && <p className={styles.subtitle}>{sousTitreOffre}</p>}
				</header>

				{children && <div>{children}</div>}
			</div>


			{étiquetteOffreList.length > 0 && <div className={styles.tags}>
				<TagList list={étiquetteOffreList} aria-label="Caractéristiques de l‘offre"/>
			</div>}

			{lienOffre &&
				// NOTE (BRUJ 31-03-2023): L‘intégralité de la carte est cliquable grâce aux propriétés CSS
				<div className={styles.linkContainer}>
					<Link
						id={idLink}
						href={lienOffre}
						appearance={'asQuaternaryButton'}
						aria-labelledby={intituléLienOffre ? undefined : `${idIntitulé} ${idLink}`}
					>
						{intituléLienOffre || 'En savoir plus'}
						<Link.Icon name="angle-right"/>
					</Link>
				</div>}
		</div>
	);
}
