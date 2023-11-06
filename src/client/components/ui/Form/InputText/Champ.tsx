import React, { ComponentPropsWithoutRef, useEffect, useId, useState } from 'react';

import { ChampContextProvider, useChampContext } from '~/client/components/ui/Form/InputText/ChampContext';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import styles from './Champ.module.scss';
import { Error } from './Error';
import { Hint } from './Hint';
import { Input } from './Input';
import { Label } from './Label';


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

export const InputChamp = React.forwardRef<HTMLInputElement, ComponentPropsWithoutRef<typeof Input>>(function InputChamp(
	{
		'aria-describedby': ariaDescribedby = '',
		id,
		...rest
	}, outerRef) {
	const { errorId, hintId, setTouched, inputId, setInputId, setErrorMessage } = useChampContext();
	const inputRef = useSynchronizedRef(outerRef);

	useEffect(() => {
		id && setInputId(id);
	}, [id, setInputId]);

	return (<Input
		onTouch={(touched: boolean) => setTouched(touched)}
		ref={inputRef}
		aria-describedby={`${ariaDescribedby} ${errorId} ${hintId}`}
		id={inputId}
		onChange={(event) => setErrorMessage(event.currentTarget.validationMessage)}
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
