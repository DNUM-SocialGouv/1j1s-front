import React, { KeyboardEvent, useCallback, useReducer, useState } from 'react';

import { ComboboxReducer } from '~/client/components/ui/Form/Combobox/ComboboxReducer';

type ComboboxProps = React.ComponentPropsWithoutRef<'input'> & {
	children: React.ReactNode,
};

const ComboboxComponent = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox({
	children,
	onKeyDown: onKeyDownProps,
	...inputProps
}, ref) {

	const [{ open, activeDescendant: activeDescendantIndex }, dispatch] = useReducer(
		ComboboxReducer,
		{ activeDescendant: null, open: false },
	);

	const activeDescendant = `option-${activeDescendantIndex}`;

	const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
		dispatch('nextDescendant');
		if (onKeyDownProps) {
			onKeyDownProps(event);
		}
	}, [onKeyDownProps]);
	return (
		<div>
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
