import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, FocusEvent, useCallback } from 'react';

import { ChangeEvent } from '~/client/components/ui/Form/Combobox/ChangeEvent';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import styles from './Input.module.scss';
import { useTouchedInput } from '~/client/hooks/useTouchedInput';

type InputProps = ComponentPropsWithoutRef<'input'> & {
	validation?: (value: string) => string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
	{
		className,
		validation,
		onChange: onChangeProps = doNothing,
		onFocus: onFocusProps = doNothing,
		onBlur: onBlurProps = doNothing,
		...props
	}, outerRef) {
	const inputRef = useSynchronizedRef(outerRef);
	const { touched, saveValueOnFocus, setTouchedOnBlur } = useTouchedInput();

	const onChange = useCallback(function onChange(event: ChangeEvent<HTMLInputElement>) {
		onChangeProps(event);

		if (validation) {
			const error = validation(event.currentTarget.value);
			inputRef.current?.setCustomValidity(error);
		}
	}, [inputRef, onChangeProps, validation]);

	const onFocus = useCallback(function onFocus(event: FocusEvent<HTMLInputElement>) {
		saveValueOnFocus(event.currentTarget.value);
		onFocusProps(event);
	}, [onFocusProps, saveValueOnFocus]);

	const onBlur = useCallback(function onFocus(event: FocusEvent<HTMLInputElement>) {
		setTouchedOnBlur(event.currentTarget.value);
		onBlurProps(event);
	}, [onBlurProps, setTouchedOnBlur]);

	return <input data-touched={touched} ref={inputRef} onChange={onChange} onFocus={onFocus} onBlur={onBlur} className={classNames(styles.input, className)} {...props}/>;
});


function doNothing() {
	return;
}
