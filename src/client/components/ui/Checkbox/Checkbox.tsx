import classNames from 'classnames';
import React, {
	useCallback,
	useEffect,
	useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Checkbox/Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<unknown> {
  id?: string
  label: string
}

export function Checkbox({ id, label, className, ...rest  }: CheckboxProps) {
	const checkboxId = useRef(id || uuidv4());
	const checkboxRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		checkboxId.current = id || uuidv4();
	}, [id]);

	const handleKeyboardEvent = useCallback((e: React.KeyboardEvent) => {
		if (e.key === ' ' && checkboxRef.current) {
			checkboxRef.current.checked = !checkboxRef.current.checked;
		}
	}, [checkboxRef]);

	return (
		<div className={classNames(styles.checkbox, className)}>
			<input
				type="checkbox"
				{...rest}
				ref={checkboxRef}
				id={checkboxId.current}
			/>
			<label className={styles.label} htmlFor={checkboxId.current} tabIndex={0} onKeyDown={handleKeyboardEvent}>{label}</label>
		</div>
	);
}
