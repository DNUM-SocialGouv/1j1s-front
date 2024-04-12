import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/Hero/HeroComponent.module.scss';
import { Image } from '~/client/components/ui/Img';

interface HeroComponentProps extends Pick<React.HTMLAttributes<unknown>, 'className' | 'children'> {
  titlePrimaryText: React.ReactNode
  titleSecondaryText: React.ReactNode
  imgSrc: string
  additionalInformation?: React.ReactNode
}

export function HeroComponent(props: HeroComponentProps) {
	const { titlePrimaryText, titleSecondaryText, imgSrc, className, children } = props;

	return (
		<div className={classNames(styles.heading, className)}>
			<div className={styles.headingContainerWrapper}>
				<div className={styles.headingContainer}>
					<div className={styles.headingContainer__Title}>
						<h1 className={styles.headingContainer__TitlePrimary}>{titlePrimaryText}</h1>
						<span className={styles.headingContainer__TitleSecondary}>{titleSecondaryText}</span>
					</div>
					{children}
				</div>
			</div>
			<div className={styles.imageWrapper}>
        	<Image src={imgSrc} alt="" fill sizes="{(min-width:992px) 50vw}" priority />
			</div>
		</div>
	);
}
