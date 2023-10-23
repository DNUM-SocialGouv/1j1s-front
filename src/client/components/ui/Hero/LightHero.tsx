import classNames from 'classnames';
import React from 'react';

import styles from './LightHero.module.scss';

export function LightHero({ children, className, ...rest }: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div className={classNames(styles.hero, className)} {...rest}>
			{children}
		</div>
	);
}

export function LightHeroPrimaryText({ children, className, ...rest }: React.ComponentPropsWithoutRef<'span'>) {
	return <span className={classNames(styles.heroPrimaryText, className)} {...rest}>{children}</span>;
}

export function LightHeroSecondaryText({ children, className, ...rest }: React.ComponentPropsWithoutRef<'span'>) {
	return <span className={classNames(styles.heroSecondaryText, className)} {...rest}>{children}</span>;
}
