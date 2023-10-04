import classNames from 'classnames';
import React, { ComponentPropsWithoutRef } from 'react';

import styles from './Input.module.scss';

type InputProps = ComponentPropsWithoutRef<'input'>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
	return <input ref={ref} className={classNames(styles.input, className)} {...props}/>;
});
