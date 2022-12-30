import classNames from 'classnames';
import Image from 'next/legacy/image';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/Hero/Hero.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroProps extends CommonProps {
  image?: string
  ariaHidden?: boolean
}

export function Hero({ children, image, ariaHidden, className, ...rest }: React.PropsWithChildren<HeroProps>) {
	const { isLargeScreen } = useBreakpoint();

	return (
		<div className={classNames(className, styles.hero)} {...rest}>
			<h1 className={styles.heroTitle}>
				{children}
			</h1>
			{image && isLargeScreen && (
				<div className={styles.heroIllustration}>
					<Image src={image} alt="" layout="fill" objectFit="cover" objectPosition="top left" aria-hidden={ariaHidden}/>
				</div>
			)}
		</div>
	);
}
