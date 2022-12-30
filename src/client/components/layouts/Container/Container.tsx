import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/layouts/Container/Container.module.scss';
import { CommonProps } from '~/client/components/props';

export function Container({ children, className, ...rest }: React.PropsWithChildren<CommonProps>) {
	return (
		<div className={classNames(styles.container, className)} {...rest}>
			{children}
		</div>
	);
}
