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

	return (
		<ChampContextProvider value={{ errorId, hintId, setErrorId, setHintId, setTouched, touched }}>
			<div className={styles.champ} {...props}/>
		</ChampContextProvider>
	);
}

export const InputChamp = React.forwardRef<HTMLInputElement, ComponentPropsWithoutRef<typeof Input>>(function InputChamp(
	{
		'aria-describedby': ariaDescribedby = '',
		...rest
	}, outerRef) {
	const { errorId, hintId, setTouched } = useChampContext();
	const inputRef = useSynchronizedRef(outerRef);

	return (<Input
		onTouch={(touched: boolean) => setTouched(touched)}
		ref={inputRef}
		aria-describedby={`${ariaDescribedby} ${errorId} ${hintId}`}
		{...rest}
	/>);
});

function ErrorChamp({ id, ...rest }: ComponentPropsWithoutRef<typeof Error>) {
	const { errorId, setErrorId, touched } = useChampContext();

	useEffect(() => {
		id && setErrorId(id);
	}, [id, setErrorId]);

	return (touched && <Error id={id ?? errorId} {...rest} />);
}

function HintChamp({ id, ...rest }: ComponentPropsWithoutRef<typeof Hint>) {
	const { hintId, setHintId } = useChampContext();

	useEffect(() => {
		id && setHintId(id);
	}, [id, setHintId]);

	return (<Hint id={id ?? hintId} {...rest}/>);
}

Champ.Input = InputChamp;
Champ.Label = Label;
Champ.Error = ErrorChamp;
Champ.Hint = HintChamp;
