import React, { ComponentPropsWithoutRef, useEffect, useId, useState } from 'react';

import { ChampContextProvider, useChampContext } from '~/client/components/ui/Form/InputText/ChampContext';

import styles from './Champ.module.scss';
import { Error } from './Error';
import { Hint } from './Hint';
import { Input } from './Input';
import { Label } from './Label';


export function Champ(props: ComponentPropsWithoutRef<'div'>) {
	const [errorId, setErrorId] = useState<string>(useId());
	return (
		<ChampContextProvider value={{ errorId, setErrorId }}>
			<div className={styles.champ} {...props}/>
		</ChampContextProvider>
	);
}

export const InputChamp = React.forwardRef<HTMLInputElement, ComponentPropsWithoutRef<typeof Input>>(function InputChamp(
	{
		'aria-describedby': ariaDescribedby = '',
		...rest
	}, ref) {
	const { errorId } = useChampContext();
	return (<Input
		ref={ref}
		aria-describedby={`${ariaDescribedby} ${errorId}`}
		{...rest}
	/>);
});

function ErrorChamp({ id, ...rest }: ComponentPropsWithoutRef<typeof Error>) {
	const { errorId, setErrorId } = useChampContext();

	useEffect(() => {
		id && setErrorId(id);
	}, [id, setErrorId]);

	return (<Error id={id ?? errorId} {...rest}/>);
}

Champ.Input = InputChamp;
Champ.Label = Label;
Champ.Error = ErrorChamp;
Champ.Hint = Hint;
