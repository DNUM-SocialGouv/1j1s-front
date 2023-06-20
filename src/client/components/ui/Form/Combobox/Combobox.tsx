import React, { ChangeEvent, KeyboardEvent, useCallback, useId, useReducer, useRef } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { ComboboxProvider, useCombobox } from '~/client/components/ui/Form/Combobox/ComboboxContext';
import {
	ComboboxActions as Actions,
	ComboboxReducer,
} from '~/client/components/ui/Form/Combobox/ComboboxReducer';
import { matchesInput } from '~/client/components/ui/Form/Combobox/utils';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import styles from './Combobox.module.scss';

type ComboboxProps = React.ComponentPropsWithoutRef<'input'> & {
	children: React.ReactNode,
};

const ComboboxComponent = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox({
	children,
	onKeyDown: onKeyDownProps,
	onChange: onChangeProps,
	value: valueProps,
	defaultValue,
	...inputProps
}, inputRef) {
	const listboxRef = useRef<HTMLUListElement>(null);
	const [state, dispatch] = useReducer(
		ComboboxReducer,
		{ activeDescendant: undefined, open: false, suggestionList: listboxRef, value: defaultValue?.toString() ?? '' },
	);
	const { open, activeDescendant, value: valueState } = state;
	const value = valueProps?.toString() ?? valueState;

	const triggerChangeEvents = useCallback(function triggerChangeEvents(event: React.KeyboardEvent<HTMLInputElement>) {
		const changeEvent: React.ChangeEvent<HTMLInputElement> = {
			...event,
			target: event.currentTarget,
		};
		if (onChangeProps) { onChangeProps(changeEvent); }
		if (inputProps.onInput) { inputProps.onInput(changeEvent); }
	}, [inputProps, onChangeProps]);
	const getSelectedValue = useCallback(function getSelectedValue(event: React.KeyboardEvent<HTMLInputElement>) {
		const activeElement = event.currentTarget.getAttribute('aria-activedescendant');
		if (!activeElement) {
			return null;
		}
		return document.getElementById(activeElement)?.textContent;
	}, []);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		switch (event.key) {
			case KeyBoard.ARROW_UP:
				dispatch(new Actions.PreviousOption());
				event.preventDefault();
				break;
			case KeyBoard.ARROW_DOWN:
				if (event.altKey) {
					dispatch(new Actions.OpenList());
				} else {
					dispatch(new Actions.NextOption());
				}
				event.preventDefault();
				break;
			case KeyBoard.ESCAPE:
				dispatch(new Actions.CloseList());
				break;
			case KeyBoard.ENTER: {
				const value = getSelectedValue(event);
				if (value) {
					dispatch(new Actions.SetValue(value));
					triggerChangeEvents(event);
				}
				dispatch(new Actions.CloseList());
				break;
			}
			default:
				break;
		}

		if (onKeyDownProps) {
			onKeyDownProps(event);
		}
	}, [getSelectedValue, onKeyDownProps, triggerChangeEvents]);
	const onChange = useCallback(function onChange(event: ChangeEvent<HTMLInputElement>) {
		dispatch(new Actions.SetValue(event.currentTarget.value));
		dispatch(new Actions.OpenList());
		if (onChangeProps) { onChangeProps(event); }
	}, [onChangeProps]);

	return (
		<ComboboxProvider value={{ ...state }}>
			<div className={styles.combobox}>
				<input {...inputProps}
					ref={inputRef}
					onKeyDown={onKeyDown}
					aria-activedescendant={activeDescendant}
					value={value}
					onChange={onChange} />
				<ul role="listbox" hidden={!open} ref={listboxRef}>
					{children}
				</ul>
			</div>
		</ComboboxProvider>
	);
});

type OptionProps = React.ComponentPropsWithoutRef<'li'>;

const Option = React.forwardRef<HTMLLIElement, OptionProps>(function Option({
	...optionProps
}, outerRef) {
	const ref = useSynchronizedRef(outerRef);
	const id = useId();
	const { activeDescendant, value } = useCombobox();
	const selected = activeDescendant === id;
	const hidden = !matchesInput(ref.current, value);
	return (
		<li role="option" {...optionProps} aria-selected={selected} hidden={hidden} id={id} ref={ref} />
	);
});

export const Combobox = Object.assign(ComboboxComponent, { Option });
