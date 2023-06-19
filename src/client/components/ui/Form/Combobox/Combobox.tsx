import React, { KeyboardEvent, useCallback, useReducer } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { ComboboxActions, ComboboxReducer } from '~/client/components/ui/Form/Combobox/ComboboxReducer';

import styles from './Combobox.module.scss';

type ComboboxProps = React.ComponentPropsWithoutRef<'input'> & {
	children: React.ReactNode,
};

const ComboboxComponent = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox({
	children,
	onKeyDown: onKeyDownProps,
	...inputProps
}, ref) {
	const optionCount = React.Children.count(children);

	const [{ open, activeDescendant: activeDescendantIndex }, dispatch] = useReducer(
		ComboboxReducer,
		{ activeDescendant: null, open: false, optionCount },
	);

	const activeDescendant = activeDescendantIndex != null ? `option-${activeDescendantIndex}` : undefined;

	const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
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
				const activeElement = event.currentTarget.getAttribute('aria-activedescendant');
				if (!activeElement) { break; }
				const value = document.getElementById(activeElement)?.textContent;
				if (!value) { break; }
				event.currentTarget.value = value;
				triggerChangeEvents(event);
				break;
			}
			default:
				break;
		}

		if (onKeyDownProps) {
			onKeyDownProps(event);
		}
	}, [onKeyDownProps]);

	function triggerChangeEvents(event: React.KeyboardEvent<HTMLInputElement>) {
		const changeEvent: React.ChangeEvent<HTMLInputElement> = {
			...event,
			target: event.currentTarget,
		};
		if (inputProps.onChange) { inputProps.onChange(changeEvent); }
		if (inputProps.onInput) { inputProps.onInput(changeEvent); }
	}

	return (
		<div className={styles.combobox}>
			<input {...inputProps} ref={ref} onKeyDown={onKeyDown} aria-activedescendant={activeDescendant} />
			<ul role="listbox" hidden={!open}>{
				React.Children.map(children, (child, index) => (
					React.isValidElement<OptionProps>(child) && child.type === Option
						? React.cloneElement(child, { 'aria-selected': activeDescendantIndex === index, id: `option-${index}` })
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
