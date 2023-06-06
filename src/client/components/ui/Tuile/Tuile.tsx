import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/Tuile/Tuile.module.scss';

import { Icon, IconName } from '../Icon/Icon';

type TuileProps = React.ComponentPropsWithoutRef<'div'> & {
    iconName: IconName;
}

export function Tuile({ iconName, children, className } : TuileProps) {
	return (
		<div className={classNames(styles.tuile, className)}>
			<Icon name={iconName}/>
			{children}
		</div>
	);
}
