import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import styles from '../Champ.module.scss';


type ErrorProps = ComponentPropsWithoutRef<'p'>

export function Error({ className, ...rest }: ErrorProps) {
	return <p className={classNames(styles.error, className)} {...rest}/>;
}
