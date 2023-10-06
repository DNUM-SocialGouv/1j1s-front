import { ComponentPropsWithoutRef } from 'react';

import { Error } from './Error/Error';
import { Input } from './Input';
import { Label } from './Label';


export function Champ(props : ComponentPropsWithoutRef<'div'>) {
	return <div {...props}/>;
}

Champ.Input = Input;
Champ.Label = Label;
Champ.Error = Error;

//Champ.Error
