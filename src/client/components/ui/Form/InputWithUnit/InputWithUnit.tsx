import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, useId } from 'react';

import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import { Input } from '../Input';
import styles from './InputWithUnit.module.scss';

interface InputWithUnitProps extends ComponentPropsWithoutRef<'input'> {
	unite: string
	nomDeLUnite: string
}

export const InputWithUnit = React.forwardRef<HTMLInputElement, InputWithUnitProps>(function InputWithUnit(
	props, outerRef) {
	const { unite, nomDeLUnite, className, ...rest } = props;
	const idUnite = useId();
	const inputRef = useSynchronizedRef(outerRef);

	return (
		<div className={styles.inputWithUnit}>
			<Input
				ref={inputRef}
				className={classNames(className, styles.input)}
				{...rest}
				aria-describedby={`${idUnite} ${props['aria-describedby'] ?? ''}`} />
			<abbr className={styles.remunerationUnite} title={nomDeLUnite} id={idUnite}>{unite}</abbr>
		</div>
	);
});
