import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Radio/Radio.module.scss';

interface RadioProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> {
  label: string;
}

export function Radio({ id, label, className, ...rest } : RadioProps) {
	const radioButtonId = useRef(id || uuidv4());

	useEffect(() => {
		radioButtonId.current = id || uuidv4();
	}, [id]);

	return (
		<div className={classNames(styles.radioButton, className)}>
			<input
				type="radio"
				{...rest}
				id={radioButtonId.current}
			/>
			<label className={styles.label} htmlFor={radioButtonId.current}>
				{label}
			</label>
		</div>
	);
}
