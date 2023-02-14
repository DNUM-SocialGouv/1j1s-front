import classNames from 'classnames';
import React, {
	useCallback,
	useEffect, useId,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Form/InputText/InputText.module.scss';
import { useSynchronizedRef } from '~/client/components/useSynchronizedRef';

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
	label?: React.ReactNode;
	hint?: string;
};

export const InputArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({
	label,
	hint,
	id: idProps,
	'aria-describedby': DescribedByProps,
	...textareaProps
}, refProps) {
	const generatedId = useId();
	const id = idProps ?? generatedId;
	const hintId = useId();

	const ref = useSynchronizedRef(refProps);
	const [error, setError] = useState<string | undefined>();
	useLayoutEffect(function initilizeErrorState() {
		const message = ref.current?.validationMessage;
		setError(message);
	}, [ref, setError]);

	const ariaDescribedby = hint
		? `${DescribedByProps} ${hintId}`
		: DescribedByProps;

	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<textarea id={id} aria-describedby={ariaDescribedby} {...textareaProps} ref={ref}/>
			{hint && <p className={classNames(styles.textInputHint)} id={hintId}>{hint}</p>}
			<p>{error}</p>
		</>
	);
});
