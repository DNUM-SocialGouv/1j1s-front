import classNames from 'classnames';
import React, { KeyboardEvent, useCallback, useEffect, useId, useLayoutEffect, useReducer, useRef } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { ChangeEvent } from '~/client/components/ui/Form/Combobox/ChangeEvent';
import { ComboboxProvider, useCombobox } from '~/client/components/ui/Form/Combobox/ComboboxContext';
import { ComboboxAction as Actions, ComboboxReducer } from '~/client/components/ui/Form/Combobox/ComboboxReducer';
import { matchesInput } from '~/client/components/ui/Form/Combobox/utils';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import styles from './Combobox.module.scss';

type ComboboxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'aria-label' | 'aria-labelledby'> & {
	children: React.ReactNode,
} & ({
	'aria-label': string,
	'aria-labelledby'?: string,
} | {
	'aria-label'?: string,
	'aria-labelledby': string,
});

const ComboboxComponent = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox({
	children,
	onKeyDown: onKeyDownProps,
	onChange: onChangeProps,
	value: valueProps,
	defaultValue,
	className,
	'aria-controls': ariaControls,
	...inputProps
}, inputOuterRef) {
	const listboxRef = useRef<HTMLUListElement>(null);
	const inputRef = useSynchronizedRef(inputOuterRef);
	const [state, dispatch] = useReducer(
		ComboboxReducer,
		{ activeDescendant: undefined, open: false, suggestionList: listboxRef, value: defaultValue?.toString() ?? '' },
	);
	const { open, activeDescendant, value: valueState } = state;
	const value = valueProps?.toString() ?? valueState;
	const listboxId = useId();

	const triggerChangeEvents = useCallback(function triggerChangeEvents() {
		if (inputRef.current) {
			const changeEvent = new ChangeEvent<HTMLInputElement>(inputRef.current);
			if (onChangeProps) { onChangeProps(changeEvent); }
			if (inputProps.onInput) { inputProps.onInput(changeEvent); }
		}
	}, [inputProps, inputRef, onChangeProps]);

	useLayoutEffect(() => {
		if (activeDescendant) {
			document.getElementById(activeDescendant)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [activeDescendant]);

	useEffect(() => {
		triggerChangeEvents();
		// NOTE (GAFI 22-06-2023): triggerChangeEvents only if value changes, not if the function itself changes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valueState]);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		switch (event.key) {
			case KeyBoard.ARROW_UP:
			case KeyBoard.IE_ARROW_UP:
				dispatch(new Actions.PreviousOption());
				event.preventDefault();
				break;
			case KeyBoard.ARROW_DOWN:
			case KeyBoard.IE_ARROW_DOWN:
				if (event.altKey) {
					dispatch(new Actions.OpenList());
				} else {
					dispatch(new Actions.NextOption());
				}
				event.preventDefault();
				break;
			case KeyBoard.ESCAPE:
			case KeyBoard.IE_ESCAPE:
				dispatch(new Actions.CloseList());
				break;
			case KeyBoard.ENTER: {
				const selectedOption = event.currentTarget.getAttribute('aria-activedescendant');
				if (selectedOption) {
					dispatch(new Actions.SelectOption(selectedOption));
					event.preventDefault();
				}
				break;
			}
			default:
				break;
		}

		if (onKeyDownProps) {
			onKeyDownProps(event);
		}
	}, [onKeyDownProps]);
	const onChange = useCallback(function onChange(event: ChangeEvent<HTMLInputElement>) {
		dispatch(new Actions.SetValue(event.currentTarget.value));
		if (onChangeProps) { onChangeProps(event); }
	}, [onChangeProps]);

	return (
		<ComboboxProvider value={[ state, dispatch ]}>
			<div className={classNames(styles.combobox, className)}>
				<input
					role="combobox"
				 	aria-expanded={open}
					aria-autocomplete="list"
					aria-activedescendant={activeDescendant}
					aria-controls={`${listboxId} ${ariaControls ?? ''}`}
					ref={inputRef}
					onKeyDown={onKeyDown}
					value={value}
					onChange={onChange}
					{...inputProps} />
				<button
					onClick={() => {
						dispatch(new Actions.ToggleList());
						inputRef.current?.focus();
					}}
					tabIndex={-1}
					aria-controls={listboxId}
					aria-expanded={open}
					aria-labelledby={inputProps['aria-labelledby']}
					aria-label={inputProps['aria-label']}>
					<Icon name={'angle-down'} />
				</button>
				<ul
					role="listbox"
					id={listboxId}
					hidden={!open}
					ref={listboxRef}
					aria-labelledby={inputProps['aria-labelledby']}
					aria-label={inputProps['aria-label']}>
					{children}
				</ul>
			</div>
		</ComboboxProvider>
	);
});

type OptionProps = React.ComponentPropsWithoutRef<'li'>;

const Option = React.forwardRef<HTMLLIElement, OptionProps>(function Option({
	id: idProps,
	onClick: onClickProps,
	...optionProps
}, outerRef) {
	const ref = useSynchronizedRef(outerRef);
	const idState = useId();
	const id = idProps ?? idState;
	const [{ activeDescendant, value }, dispatch] = useCombobox();
	const selected = activeDescendant === id;
	const hidden = !matchesInput(ref.current, value);
	const onClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
		dispatch(new Actions.SelectOption(event.currentTarget));
		if (onClickProps) { onClickProps(event); }
	}, [dispatch, onClickProps]);
	return (
		<li
			role="option"
			aria-selected={selected}
			hidden={hidden}
			id={id}
			{...optionProps}
			ref={ref}
			onClick={onClick} />
	);
});

export const Combobox = Object.assign(ComboboxComponent, { Option });
