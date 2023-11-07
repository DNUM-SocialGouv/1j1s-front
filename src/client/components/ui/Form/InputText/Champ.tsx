import React, { ComponentPropsWithoutRef, useCallback, useEffect, useId, useState } from 'react';

import { ChampContextProvider, useChampContext } from '~/client/components/ui/Form/InputText/ChampContext';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import styles from './Champ.module.scss';
import { Error } from './Error';
import { Hint } from './Hint';
import { Label } from './Label';
import { Input } from '~/client/components/ui/Form/InputText/Input';


export function Champ(props: ComponentPropsWithoutRef<'div'>) {
	const [errorId, setErrorId] = useState<string>(useId());
	const [hintId, setHintId] = useState<string>(useId());
	const [touched, setTouched] = useState<boolean>(false);
	const [inputId, setInputId] = useState<string>(useId());
	const [errorMessage, setErrorMessage] = useState<string>('');

	return (
		<ChampContextProvider value={{
			errorId,
			errorMessage,
			hintId,
			inputId,
			setErrorId,
			setErrorMessage,
			setHintId,
			setInputId,
			setTouched,
			touched,
		}}>
			<div className={styles.champ} {...props}/>
		</ChampContextProvider>
	);
}

type InputChampProps<T extends ComponentChildrenPropsNecessary> = T & {
	render: React.ComponentType<T>
};

type ComponentChildrenPropsNecessary = {
	onChange?: (event: { currentTarget: { validationMessage: string } }, ...args: unknown[]) => void
	onTouch?: (touched: boolean, ...args: unknown[]) => void
	ref?: React.Ref<HTMLInputElement>
	'aria-describedby'?: string
	id?: string
}

export const InputChamp = React.forwardRef(function InputChamp<T extends ComponentChildrenPropsNecessary>(
	{
		'aria-describedby': ariaDescribedby = '',
		id,
		onChange: onChangeProps = doNothing,
		onTouch: onTouchProps = doNothing,
		render: Render,
		...rest
	}: InputChampProps<T>, outerRef: React.ForwardedRef<HTMLInputElement>) {
	const { errorId, hintId, setTouched, inputId, setInputId, setErrorMessage } = useChampContext();
	const inputRef = useSynchronizedRef(outerRef);

	useEffect(() => {
		id && setInputId(id);
	}, [id, setInputId]);

	const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, ...args: unknown[]) => {
		onChangeProps(event);
		setErrorMessage(event.currentTarget.validationMessage);
	}, [onChangeProps, setErrorMessage]);
	
	const onTouch = useCallback((touched: boolean, ...args: unknown[]) => {
		onTouchProps(touched);
		setTouched(touched);
	}, [onTouchProps, setTouched]);

	return (<Input
		onTouch={onTouch}
		ref={inputRef}
		aria-describedby={`${ariaDescribedby} ${errorId} ${hintId}`}
		id={inputId}
		onChange={onChange}
		{...rest}
	/>);
});

function ErrorChamp({ id, ...rest }: Omit<ComponentPropsWithoutRef<typeof Error>, 'children'>) {
	const { errorId, setErrorId, touched, errorMessage } = useChampContext();

	useEffect(() => {
		id && setErrorId(id);
	}, [id, setErrorId]);

	return (touched && <Error id={id ?? errorId} {...rest} >{errorMessage}</Error>);
}

function HintChamp({ id, ...rest }: ComponentPropsWithoutRef<typeof Hint>) {
	const { hintId, setHintId } = useChampContext();

	useEffect(() => {
		id && setHintId(id);
	}, [id, setHintId]);

	return (<Hint id={id ?? hintId} {...rest}/>);
}

function LabelChamp(props: ComponentPropsWithoutRef<typeof Label>) {
	const { inputId } = useChampContext();
	return <Label htmlFor={inputId} {...props} />;
}

Champ.Input = InputChamp;
Champ.Label = Object.assign(LabelChamp, Label);
Champ.Error = ErrorChamp;
Champ.Hint = HintChamp;

function doNothing() {
	return;
}
