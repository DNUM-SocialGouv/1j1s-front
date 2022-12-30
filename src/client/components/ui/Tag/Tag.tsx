import classNames from 'classnames';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/Tag/Tag.module.scss';

export function Tag({ children, className, ...rest }: React.PropsWithChildren<CommonProps>) {
	const _classNames = classNames(styles.tag, className);
  
	return (
		<span className={_classNames} {...rest}>{children}</span>
	);
}
