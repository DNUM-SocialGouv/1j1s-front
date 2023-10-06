import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import styles from '../Champ.module.scss';

export function Error({ className, ...rest }: ComponentPropsWithoutRef<'p'>){
	return <p className={classNames(className, styles.error)} {...rest}/>;
}
