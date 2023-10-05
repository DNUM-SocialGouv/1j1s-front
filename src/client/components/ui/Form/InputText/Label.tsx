import React, { ComponentPropsWithoutRef } from 'react';

type LabelProps = ComponentPropsWithoutRef<'label'> & {
	label?: string
}

export function Label({ children, ...rest }: LabelProps) {
	return (<label {...rest}>
		{children}
	</label>);
}

type ComplementProps = {
	children: React.ReactNode
}

function Complement({ children }: ComplementProps) {
	return <small>{children}</small>;
}

function Required() {
	return <span>(champ obligatoire)</span>
}

function Optional() {
	return <span>(champ optionnel)</span>
}

Label.Complement = Complement;
Label.Required = Required;
Label.Optional = Optional;


