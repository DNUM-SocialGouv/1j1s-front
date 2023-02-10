import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/layouts/Container/Container.module.scss';

export function Container({ children, className, ...rest }: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div className={classNames(styles.container, className)} {...rest}>
			{children}
		</div>
	);
}
