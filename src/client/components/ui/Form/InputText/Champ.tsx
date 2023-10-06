import { ComponentPropsWithoutRef } from 'react';

import { Error } from './Error';
import { Hint } from './Hint';
import { Input } from './Input';
import { Label } from './Label';
import styles from './Champ.module.scss';


export function Champ(props : ComponentPropsWithoutRef<'div'>) {
	return <div className={styles.champ} {...props}/>;
}

Champ.Input = Input;
Champ.Label = Label;
Champ.Error = Error;
Champ.Hint = Hint;
