import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, FocusEvent, useCallback, useEffect, useState } from 'react';

import { ChangeEvent } from '~/client/components/ui/Form/Combobox/ChangeEvent';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';
import { useTouchedInput } from '~/client/hooks/useTouchedInput';

import styles from './Input.module.scss';

type ErrorMessage = string;

type InputProps = ComponentPropsWithoutRef<'input'> & {
	validation?: (value: ComponentPropsWithoutRef<'input'>['value']) => ErrorMessage;
	onTouch?: (touched: boolean) => void,
}

// TODO (SULI 30-10-2023): le composant Input doit remplacer entièrement InputText à la fin, pas oublier de changer le nom du dossier etc
// TODO bis (SULI 30-10-2023): renommer l'ancien composant sur la PR suivante avec `Deprecated`
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
	{
		className,
		validation = nullValidation,
		onChange: onChangeProps = doNothing,
		onFocus: onFocusProps = doNothing,
		onBlur: onBlurProps = doNothing,
		defaultValue: defaultValueProps = '',
		onTouch: onTouchProps = doNothing,
		...props
	}, outerRef) {
	const inputRef = useSynchronizedRef(outerRef);
	const { touched, saveValueOnFocus, setTouchedOnBlur } = useTouchedInput();
	const [value, setValue] = useState(defaultValueProps);

	useEffect(() => {
		const error = validation(inputRef.current?.value);
		inputRef.current?.setCustomValidity(error);
	}, [inputRef, validation]);

	const onChange = useCallback(function onChange(event: ChangeEvent<HTMLInputElement>) {
		const inputValue = event.currentTarget.value;
		setValue(inputValue);
		const error = validation(inputValue);
		event.currentTarget?.setCustomValidity(error);

		onChangeProps(event);
	}, [onChangeProps, validation]);

	const onFocus = useCallback(function onFocus(event: FocusEvent<HTMLInputElement>) {
		saveValueOnFocus(event.currentTarget.value);
		onFocusProps(event);
	}, [onFocusProps, saveValueOnFocus]);

	const onBlur = useCallback(async function onBlur(event: FocusEvent<HTMLInputElement>) {
		const touched = setTouchedOnBlur(event.currentTarget.value);
		setValue(event.currentTarget.value.trim());

		if (touched) {
			onTouchProps(touched);
		}
		onBlurProps(event);
	}, [onBlurProps, onTouchProps, setTouchedOnBlur]);

	return <input
		data-touched={touched}
		ref={inputRef}
		onChange={onChange}
		onFocus={onFocus}
		onBlur={onBlur}
		value={value}
		className={classNames(styles.input, className)}
		{...props}
	/>;
});


function doNothing() {
	return;
}

function nullValidation() {
	return '';
}
