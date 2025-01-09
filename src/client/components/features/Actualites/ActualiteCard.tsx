import classNames from 'classnames';
import React from 'react';

import { Card } from '~/client/components/ui/Card/Card';
import Date from '~/client/components/ui/Date';
import { Link } from '~/client/components/ui/Link/Link';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';
import { Actualite } from '~/server/actualites/domain/actualite';
import { getExtraitContenu } from '~/server/cms/infra/repositories/strapi.utils';

import styles from './ActualiteCard.module.scss';

type ActualiteCardProps = Omit<React.ComponentPropsWithRef<typeof Card>, 'layout'> & {
	layout?: React.ComponentPropsWithoutRef<typeof Card>['layout']
} & {
	actualite: Actualite,
	headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
};

export default function ActualiteCard({ actualite, headingLevel = 'h2', className, ...rest }: ActualiteCardProps) {
	const isInternalLink = useIsInternalLink(actualite.link);

	const extrait = getExtraitContenu(actualite.contenu);

	return (
		<article>
			<Card className={classNames(styles.card, className)} layout="vertical" {...rest}>
				{actualite.bannière && (
					<Card.Image
						src={actualite.bannière.src}
						alt={actualite.bannière.alt}
						width={320}
						height={180} />
				)}
				<Card.Content className={styles.content}>
					{actualite.dateMiseAJour ? <Date date={actualite.dateMiseAJour} /> : <time></time>}
					<Card.Title className={styles.title} titleAs={headingLevel}>{actualite.titre}</Card.Title>
					<p>{extrait}</p>
					<Link appearance={'asQuaternaryButton'} href={actualite.link}>
						{isInternalLink ? 'Lire l\'article' : 'En savoir plus'}
						<Link.Icon />
					</Link>
				</Card.Content>
			</Card>
		</article>
	);
}
