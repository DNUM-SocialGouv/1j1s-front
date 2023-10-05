import { ComponentPropsWithoutRef } from 'react';

import { Input } from '~/client/components/ui/Form/InputText/Input';

export function Champ(props : ComponentPropsWithoutRef<'div'>) {
	return <div {...props}/>;
}

Champ.Input = Input;

//Champ.Input
//Champ.Label
//Champ.Error
