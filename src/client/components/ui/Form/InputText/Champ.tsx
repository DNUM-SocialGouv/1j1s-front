import { ComponentPropsWithoutRef, useId } from 'react';

import { ChampContextProvider } from '~/client/components/ui/Form/InputText/ChampContext';

import styles from './Champ.module.scss';
import { Error } from './Error';
import { Hint } from './Hint';
import { Input } from './Input';
import { Label } from './Label';


export function Champ(props : ComponentPropsWithoutRef<'div'>) {
	const errorId = useId();

	return (
		<ChampContextProvider value={{ errorId }}>
			<div className={styles.champ} {...props}/>
		</ChampContextProvider>
	);
}

Champ.Input = Input;
Champ.Label = Label;
Champ.Error = Error;
Champ.Hint = Hint;
