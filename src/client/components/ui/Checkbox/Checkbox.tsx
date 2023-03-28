import classNames from 'classnames';
import React, {
	useEffect,
	useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Checkbox/Checkbox.module.scss';

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
	{ id, label, className, ...rest  }
	, ref,
) {
	const checkboxId = useRef(id || uuidv4());

	useEffect(() => {
		checkboxId.current = id || uuidv4();
	}, [id]);

	return (
		<div className={classNames(styles.checkbox, className)}>
			<input
				type="checkbox"
				{...rest}
				ref={ref}
				id={checkboxId.current}
			/>
			<label className={styles.label} htmlFor={checkboxId.current}>{label}</label>
		</div>
	);
});
