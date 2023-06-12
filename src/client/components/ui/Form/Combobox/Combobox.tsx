import React, { KeyboardEvent, useCallback, useReducer } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { ComboboxReducer } from '~/client/components/ui/Form/Combobox/ComboboxReducer';

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
		if (event.key === KeyBoard.ARROW_UP) {
			dispatch('previousOption');
		} else if (event.key === KeyBoard.ARROW_DOWN) {
			dispatch('nextOption');
		} else if (event.key === KeyBoard.ESCAPE) {
			dispatch('closeList');
		}
		if (onKeyDownProps) {
			onKeyDownProps(event);
		}
	}, [onKeyDownProps]);
	return (
		<div className={styles.combobox}>
			<input {...inputProps} ref={ref} onKeyDown={onKeyDown} aria-activedescendant={activeDescendant}/>
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
