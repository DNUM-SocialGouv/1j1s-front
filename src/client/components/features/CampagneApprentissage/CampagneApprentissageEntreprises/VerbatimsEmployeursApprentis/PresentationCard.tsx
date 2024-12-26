import classNames from 'classnames';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import { Card } from '~/client/components/ui/Card/Card';

import styles from './PresentationCard.module.scss';

interface PresentationCardProps {
	imageSrc: string
	titleLabel: string
	titleHeadingTag: HtmlHeadingTag
	imageFit?: 'cover' | 'contain'
}

export function PresentationCard({
	className,
	children,
	imageSrc,
	titleLabel,
	titleHeadingTag,
	imageFit = 'cover',
}: PresentationCardProps & React.HTMLAttributes<HTMLLinkElement>) {
	const imageClassName = classNames(styles.illustration, imageFit === 'contain' && styles.illustrationContain);

	return (
		<Card className={classNames(className, styles.card)} layout={'vertical'}>
			<Card.Image className={imageClassName} src={imageSrc} aria-hidden width={320} height={180} />
			<Card.Content className={styles.content}>
				<Card.Title className={styles.title} titleAs={titleHeadingTag}>{titleLabel}</Card.Title>
				{children}
			</Card.Content>
		</Card>
	);
}
