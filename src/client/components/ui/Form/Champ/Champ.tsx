import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, useCallback, useEffect, useId, useState } from 'react';

import { Error } from '~/client/components/ui/Form/Error';
import { Hint } from '~/client/components/ui/Form/Hint';
import { Label } from '~/client/components/ui/Form/Label';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import styles from './Champ.module.scss';
import { ChampContextProvider, useChampContext } from './ChampContext';

export function Champ(props: ComponentPropsWithoutRef<'div'>) {
	const [errorId, setErrorId] = useState<string>(useId());
	const [hintId, setHintId] = useState<string>(useId());
	const [touched, setTouched] = useState<boolean>(false);
	const [inputId, setInputId] = useState<string>(useId());
	const [errorMessage, setErrorMessage] = useState<string>('');
	const { className: classNameProps, ...otherProps } = props;

	return (
		<ChampContextProvider value={{
			errorId,
			errorMessage,
			hintId,
			inputId,
			setErrorId,
			setErrorMessage,
			setHintId,
			setInputId,
			setTouched,
			touched,
		}}>
			<div className={classNames(styles.champ, classNameProps)} {...otherProps}/>
		</ChampContextProvider>
	);
}

type InputChampProps<Props extends ComponentChildrenPropsNecessary<T>, T extends HTMLInputElement | HTMLTextAreaElement> = Props extends {render: unknown} ? never: Props & {
	render: React.ComponentType<Props>
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChangeFunction<T extends HTMLInputElement | HTMLTextAreaElement> = (event: React.ChangeEvent<T>, ...args: any[]) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TouchFunction = (touched: boolean, ...args: any[]) => void;
type ComponentChildrenPropsNecessary<T extends HTMLInputElement | HTMLTextAreaElement> = {
	onChange?: ChangeFunction<T>
	onInvalid?: ChangeFunction<T>
	onTouch?: TouchFunction
	ref?: React.Ref<T>
	'aria-describedby'?: string
	id?: string
}

export const InputChamp: <
	Props extends ComponentChildrenPropsNecessary<T>,
	T extends HTMLInputElement | HTMLTextAreaElement
>(props: InputChampProps<Props, T>) => React.ReactNode = React.forwardRef(function InputChamp<
	Props extends ComponentChildrenPropsNecessary<T>,
	T extends HTMLInputElement | HTMLTextAreaElement
>(
	{
		'aria-describedby': ariaDescribedby = '',
		id,
		onChange: onChangeProps = doNothing,
		onInvalid: onInvalidProps = doNothing,
		onTouch: onTouchProps = doNothing,
		render: Render,
		...rest
	}: InputChampProps<Props, T>, outerRef: React.ForwardedRef<T>) {
	const { errorId, hintId, setTouched, inputId, setInputId, setErrorMessage, errorMessage } = useChampContext();
	const inputRef = useSynchronizedRef(outerRef);

	useEffect(() => {
		id && setInputId(id);
	}, [id, setInputId]);

	const onChange = useCallback<ChangeFunction<T>>((event, ...args) => {
		setErrorMessage('');
		onChangeProps(event, ...args);
	}, [onChangeProps, setErrorMessage]);

	const onTouch = useCallback<TouchFunction>((touched, ...args) => {
		onTouchProps(touched, ...args);
		setTouched(touched);
	}, [onTouchProps, setTouched]);

	const onInvalid = useCallback<ChangeFunction<T>>((event, ...args) => {
		setErrorMessage(event.currentTarget.validationMessage);
		onInvalidProps(event, ...args);
	}, [onInvalidProps, setErrorMessage]);

	return (<Render
		onTouch={onTouch}
		ref={inputRef}
		aria-describedby={`${ariaDescribedby} ${errorMessage ? errorId : ''} ${hintId}`}
		aria-invalid={errorMessage !== ''}
		id={inputId}
		onInvalid={onInvalid}
		onChange={onChange}
		{...rest}
	/>);
});

function ErrorChamp({ id, ...rest }: Omit<ComponentPropsWithoutRef<typeof Error>, 'children'>) {
	const { errorId, setErrorId, touched, errorMessage } = useChampContext();

	useEffect(() => {
		id && setErrorId(id);
	}, [id, setErrorId]);

	return (touched && errorMessage && <Error id={id ?? errorId} {...rest} >{errorMessage}</Error>);
}

function HintChamp({ id, ...rest }: ComponentPropsWithoutRef<typeof Hint>) {
	const { hintId, setHintId } = useChampContext();

	useEffect(() => {
		id && setHintId(id);
	}, [id, setHintId]);

	return (<Hint id={id ?? hintId} {...rest}/>);
}

function LabelChamp(props: ComponentPropsWithoutRef<typeof Label>) {
	const { inputId } = useChampContext();
	return <Label htmlFor={inputId} {...props} />;
}

Champ.Input = InputChamp;
Champ.Label = Object.assign(LabelChamp, Label);
Champ.Error = ErrorChamp;
Champ.Hint = HintChamp;

function doNothing() {
	return;
}
