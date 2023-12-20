import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, FocusEvent, useCallback, useEffect } from 'react';

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
		onTouch: onTouchProps = doNothing,
		...props
	}, outerRef) {
	const inputRef = useSynchronizedRef(outerRef);
	const { touched, saveValueOnFocus, setTouchedOnBlur } = useTouchedInput();

	useEffect(() => {
		const error = validation(inputRef.current?.value);
		inputRef.current?.setCustomValidity(error);
	}, [inputRef, validation]);

	const onChange = useCallback(function onChange(event: ChangeEvent<HTMLInputElement>) {
		onChangeProps(event);

		const error = validation(event.currentTarget.value);
		event.currentTarget?.setCustomValidity(error);
	}, [onChangeProps, validation]);

	const onFocus = useCallback(function onFocus(event: FocusEvent<HTMLInputElement>) {
		saveValueOnFocus(event.currentTarget.value);
		onFocusProps(event);
	}, [onFocusProps, saveValueOnFocus]);

	const onBlur = useCallback(async function onFocus(event: FocusEvent<HTMLInputElement>) {
		const touched = setTouchedOnBlur(event.currentTarget.value);
		if (touched) { onTouchProps(touched); }
		onBlurProps(event);
	}, [onBlurProps, onTouchProps, setTouchedOnBlur]);

	return <input
		data-touched={touched}
		ref={inputRef}
		onChange={onChange}
		onFocus={onFocus}
		onBlur={onBlur}
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
