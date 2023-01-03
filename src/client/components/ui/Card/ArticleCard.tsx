import Link from 'next/link';
import React, { useRef } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';

import { CardComponent } from './AbstractCard/CardComponent';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  icon?: React.ReactNode
  imageSrc: string
  titleLabel: string
  link: string
  linkLabel?: string
}

export function ArticleCard({ className, children, icon, imageSrc, link, linkLabel = 'Lire l‘article', titleLabel }: ArticleCardProps & React.HTMLAttributes<HTMLLinkElement>) {
	const iconComponent = useRef(icon ? icon : <Icon name={'arrow-right'}/>);

	return (
		<Link href={link} className={'underline-none'}>
			<CardComponent className={className} layout={'vertical'}>
				<CardComponent.Image className={styles.illustration} src={imageSrc} aria-hidden/>
				<CardComponent.Content className={styles.content}>
					<CardComponent.Title className={styles.title} titleAs={'h3'}>{titleLabel}</CardComponent.Title>
					{children}
					<CardComponent.FakeLink className={styles.cta} appearance={'tertiary'} icon={iconComponent.current} label={linkLabel} />
				</CardComponent.Content>
			</CardComponent>
		</Link>
	);
}
