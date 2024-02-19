import React from 'react';

import SeeMoreItemList, { SeeMoreProps } from '~/client/components/ui/SeeMore/SeeMoreItemList';

import styles from './SeeMoreMobileOnly.module.scss';

export default function SeeMoreMobileOnly(props: SeeMoreProps) {
	const { children, ...rest } = props;

	return (
		<>
			<SeeMoreItemList {...rest} className={styles.smallScreenOnly}/>
			<div className={styles.largeScreenOnly}>{children}</div>
		</>
	);
}
