import classNames from 'classnames';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/Hero/Hero.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroIllustrationProps extends CommonProps {
	image: string
}

export function Hero({ children, className, ...rest }: PropsWithChildren<CommonProps>) {
	return <div className={classNames(styles.hero, className)} {...rest}>
		<div className={styles.heroTextWrapper}>
			{ children }
		</div>
	</div>;
}

export function HeroWithIllustration({ children, className, image, ...rest }: PropsWithChildren<HeroIllustrationProps>) {
	const { isLargeScreen } = useBreakpoint();
	if (isLargeScreen) {
		return (
			<div className={classNames(styles.hero, className)} {...rest}>
				<div className={styles.heroTextWrapper}>
					{children}
				</div>
				<div className={styles.heroIllustration}>
					<Image src={image} alt="" fill sizes="(min-width: 992px) 50vw" priority />
				</div>
			</div>
		);
	}
	return Hero({ children, className, ...rest });
}

export function HeroPrimaryText({ children, className, ...rest }: React.PropsWithChildren<CommonProps>) {
	return <div className={classNames(styles.heroPrimaryText, className)} {...rest}>
		{children}
	</div>;
}

export function HeroSecondaryText({ children, className, ...rest }: PropsWithChildren<CommonProps>) {
	return <p className={classNames(styles.heroSecondaryText, className)} {...rest}>
		{children}
	</p>;
}
