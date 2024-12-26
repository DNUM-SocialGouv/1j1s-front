import classNames from 'classnames';
import React from 'react';

import styles
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/VerbatimsEmployeursApprentis/PresentationCard.module.scss';
import { HtmlHeadingTag } from '~/client/components/props';
import { Card } from '~/client/components/ui/Card/Card';


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
}: PresentationCardProps & React.HTMLAttributes<HTMLLinkElement>) {

	return (
		<Card className={classNames(className, styles.card)} layout={'vertical'}>
			<Card.Image className={styles.illustration} src={imageSrc} aria-hidden width={320} height={180} />
			<Card.Content className={styles.content}>
				<Card.Title className={styles.title} titleAs={titleHeadingTag}>{titleLabel}</Card.Title>
				{children}
			</Card.Content>
		</Card>
	);
}
