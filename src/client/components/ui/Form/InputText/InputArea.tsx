import classNames from 'classnames';
import React, {
	useId,
	useLayoutEffect,
	useState,
} from 'react';

import styles from '~/client/components/ui/Form/InputText/InputText.module.scss';
import { useSynchronizedRef } from '~/client/components/useSynchronizedRef';


type ValidationFunction = (value: string) => string | null | undefined;

function useError(
	ref: React.RefObject<{ validationMessage: string | undefined }>,
	validate?: ValidationFunction,
) {
	const [error, setError] = useState<string | undefined>();

	useLayoutEffect(function initilizeErrorState() {
		const message = ref.current?.validationMessage;
		setError(message);
	}, [ref, setError]);

	function updateErrors(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const element = event.currentTarget;
		if (validate != null) {
			const validationError = validate(element.value);
			element.setCustomValidity(validationError ?? '');
		}
		const newError = element.validationMessage;
		setError(newError);
	}

	return {
		error,
		updateErrors,
	};
}

function Hint({ id, children }: { id: string, children: React.ReactNode }) {
	if (!children) return null;
	return <p className={classNames(styles.textInputHint)} id={id}>{children}</p>;
}

function Error({ id, children }: { id: string, children: React.ReactNode }) {
	if (!children) return null;
	return <p id={id} className={classNames(styles.textInputHint, styles.textInputHintError)}>{children}</p>;
}

function Label({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) {
	if (!children) return null;
	return <label htmlFor={htmlFor}>{children}</label>;
}

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
	label?: React.ReactNode;
	hint?: string;
	validate?: ValidationFunction;
};

export const InputArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({
	label,
	hint,
	id: idProps,
	'aria-describedby': DescribedByProps,
	onChange: onChangeProps,
	onBlur: onBlurProps,
	validate,
	...textareaProps
}, refProps) {
	const generatedId = useId();
	const id = idProps ?? generatedId;
	const hintId = useId();
	const errorId = useId();
	const [touched, setTouched] = useState(false);

	const ref = useSynchronizedRef(refProps);
	const { error, updateErrors } = useError(ref, validate);
	function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		updateErrors(event);
		if (onChangeProps != null) onChangeProps(event);
	}
	function onBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
		setTouched(true);
		if (onBlurProps != null) onBlurProps(event);
	}

	const ariaDescribedby = hint
		? `${DescribedByProps} ${hintId}`
		: DescribedByProps;

	return (
		<>
			<Label htmlFor={id}>{label}</Label>
			<textarea
				id={id}
				aria-errormessage={errorId}
				aria-invalid={!!error}
				aria-describedby={ariaDescribedby}
				onChange={onChange}
				onBlur={onBlur}
				{...textareaProps}
				ref={ref}/>
			{touched && <Error id={errorId}>{error}</Error>}
			{!error && <Hint id={hintId}>{hint}</Hint>}
		</>
	);
});
