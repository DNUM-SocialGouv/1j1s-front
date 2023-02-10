import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/TextArea/TextArea.module.scss';

interface TextAreaProps extends React.ComponentPropsWithoutRef<'textarea'> {
	id: string,
	placeholder: string
	label: string
	name: string
}

export function TextArea({ id, placeholder, label, name, className }: TextAreaProps) {
	return (
		<div className={classNames(styles.textArea, className)}>
			<label htmlFor={id}>{label}</label>
			<textarea
				id={id}
				className={styles.textAreaField}
				placeholder={placeholder}
				name={name}
				rows={4}
			/>
		</div>
	);
}
