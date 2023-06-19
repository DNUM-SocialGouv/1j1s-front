import React, { ChangeEvent, KeyboardEvent, useCallback, useReducer, useRef } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { ComboboxActions, ComboboxReducer } from '~/client/components/ui/Form/Combobox/ComboboxReducer';
import { matchesInput } from '~/client/components/ui/Form/Combobox/utils';

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
	const [{ open, activeDescendant, value: valueState }, dispatch] = useReducer(
		ComboboxReducer,
		{ activeDescendant: undefined, open: false, suggestionList: listboxRef, value: defaultValue?.toString() ?? '' },
	);
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
				dispatch(new ComboboxActions.PreviousOption());
				event.preventDefault();
				break;
			case KeyBoard.ARROW_DOWN:
				if (event.altKey) {
					dispatch(new ComboboxActions.OpenList());
				} else {
					dispatch(new ComboboxActions.NextOption());
				}
				event.preventDefault();
				break;
			case KeyBoard.ESCAPE:
				dispatch(new ComboboxActions.CloseList());
				break;
			case KeyBoard.ENTER: {
				const value = getSelectedValue(event);
				if (value) {
					dispatch(new ComboboxActions.SetValue(value));
					triggerChangeEvents(event);
				}
				dispatch(new ComboboxActions.CloseList());
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
		dispatch(new ComboboxActions.SetValue(event.currentTarget.value));
		dispatch(new ComboboxActions.OpenList());
		if (onChangeProps) { onChangeProps(event); }
	}, [onChangeProps]);

	return (
		<div className={styles.combobox}>
			<input {...inputProps}
				ref={inputRef}
				onKeyDown={onKeyDown}
				aria-activedescendant={activeDescendant}
				value={value}
				onChange={onChange} />
			<ul role="listbox" hidden={!open} ref={listboxRef}>{
				React.Children.map(children, (child, index) => (
					React.isValidElement<React.ComponentPropsWithRef<typeof Option>>(child) && child.type === Option
						? React.cloneElement(child, {
							'aria-selected': activeDescendant === `option-${index}`,
							// FIXME (GAFI 19-06-2023): Probablement moyen de rendre ce check safe avec l'id de l'option
							hidden: !matchesInput(listboxRef.current?.querySelectorAll('[role="option"]')[index], value),
							id: `option-${index}`,
						})
						: child
				))
			}</ul>
		</div>
	);
});

type OptionProps = React.ComponentPropsWithoutRef<'li'>;

const Option = React.forwardRef<HTMLLIElement, OptionProps>(function Option({
	'aria-selected': ariaSelected = false,
	...optionProps
}, ref) {
	return (
		<li role="option" {...optionProps} aria-selected={ariaSelected} ref={ref}>
		</li>
	);
});

export const Combobox = Object.assign(ComboboxComponent, { Option });
