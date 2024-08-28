import classNames from 'classnames';
import React from 'react';

import SeeMoreItemList, { SeeMoreProps } from '~/client/components/ui/SeeMore/SeeMoreItemList';

import styles from './SeeMoreMobileOnly.module.scss';

export default function SeeMoreMobileOnly(props: SeeMoreProps) {
	const { children, className, ...rest } = props;

	return (
		<>
			<SeeMoreItemList {...rest} className={classNames(styles.smallScreenOnly, className)} />
			<div className={classNames(styles.largeScreenOnly, className)}>{children}</div>
		</>
	);
}
