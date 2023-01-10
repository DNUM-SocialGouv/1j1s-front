import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

import {
	CommonProps,
} from '~/client/components/props';

import styles from './LightHero.module.scss';

export function LightHero({ children, className }: PropsWithChildren<CommonProps>) {
	return (
		<div className={classNames(styles.hero, className)}>
			{children}
		</div>
	);
}

export function LightHeroPrimaryText({ children, className }: PropsWithChildren<CommonProps>) {
	return <div className={classNames(styles.heroPrimaryText, className)}>{children}</div>;
}

export function LightHeroSecondaryText({ children, className }: PropsWithChildren<CommonProps>) {
	return <div className={classNames(styles.heroSecondaryText, className)}>{children}</div>;
}
