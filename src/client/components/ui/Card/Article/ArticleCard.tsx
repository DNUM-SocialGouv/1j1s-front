import classNames from 'classnames';
import Link from 'next/link';
import React, { useRef } from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Card/Article/ArticleCard.module.scss';
import { Card } from '~/client/components/ui/Card/Card';
import { Icon } from '~/client/components/ui/Icon/Icon';

interface ArticleCardProps {
	icon?: React.ReactNode
	imageSrc: string
	link: string
	titleLabel: string
	titleHeadingTag: HtmlHeadingTag
	imageFit?: 'cover' | 'contain'
	linkLabel?: string
}

export function ArticleCard({
	className,
	children,
	icon,
	imageSrc,
	link,
	titleLabel,
	titleHeadingTag,
	imageFit = 'cover',
	linkLabel = 'Lire l‘article',
}: ArticleCardProps & React.HTMLAttributes<HTMLLinkElement>) {
	const iconComponent = useRef(icon ? icon : <Icon name={'arrow-right'}/>);
	const imageClassName = classNames(styles.illustration, imageFit === 'contain' && styles.illustrationContain);

	// TODO FIXME utiliser un LinkCard?
	return (
		<Link href={link} className={classNames('underline-none', styles.link)}>
			<Card className={classNames(className, styles.card)} layout={'vertical'}>
				<Card.Image className={imageClassName} src={imageSrc} aria-hidden/>
				<Card.Content className={styles.content}>
					<Card.Title className={styles.title} titleAs={titleHeadingTag}>{titleLabel}</Card.Title>
					{children}
					<Card.FakeLink className={styles.cta} appearance={'quaternary'} icon={iconComponent.current} label={linkLabel}/>
				</Card.Content>
			</Card>
		</Link>
	);
}
