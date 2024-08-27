import classNames from 'classnames';
import React from 'react';

import { Icon, IconName } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/TextIcon/TextIcon.module.scss';

interface TextIconProps extends Pick<React.HTMLAttributes<unknown>, 'className' | 'children'> {
	icon: IconName
	iconPosition?: 'right' | 'left'
}

export function TextIcon({ children, icon, className, iconPosition = 'right' }: TextIconProps) {
	const _classNames = classNames(styles.textIcon, iconPosition === 'right' ? styles.spaceForRightIcon : styles.spaceForLeftIcon, className);

	return (
		<span className={_classNames}>
			{
				iconPosition === 'left' ? <><Icon name={icon} /> {children}</> : <>{children} <Icon name={icon} /></>
			}
		</span>
	);
};

