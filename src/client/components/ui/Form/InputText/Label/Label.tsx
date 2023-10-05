import classNames from 'classnames';
import React, { ComponentPropsWithoutRef } from 'react';

import styles from './Label.module.scss';

type LabelProps = ComponentPropsWithoutRef<'label'> & {
	label?: string
}

export function Label({ className, children, ...rest }: LabelProps) {
	return (
		<label className={classNames(styles.label, className)} {...rest}>
			{children}
		</label>
	);
}

type ComplementProps = {
	children: React.ReactNode
}

function Complement({ children }: ComplementProps) {
	return <small>{children}</small>;
}

function Required() {
	return <span>(champ obligatoire)</span>;
}

function Optional() {
	return <span>(champ optionnel)</span>;
}

Label.Complement = Complement;
Label.Required = Required;
Label.Optional = Optional;


