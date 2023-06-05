import React from 'react';

type ComboboxProps = React.ComponentPropsWithoutRef<'input'> & {
	children: React.ReactNode,
};

const ComboboxComponent = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox({
	children,
	...inputProps
}, ref) {
	return (
		<div>
			<input {...inputProps} ref={ref}/>
			<ul role="listbox">{children}</ul>
		</div>
	);
});

type OptionProps = React.ComponentPropsWithoutRef<'button'>;

const Option = React.forwardRef<HTMLButtonElement, OptionProps>(function Option({
	...optionProps
}, ref) {
	return (
		<li role="option">
			<button {...optionProps} ref={ref}/>
		</li>
	);
});

export const Combobox = Object.assign(ComboboxComponent, { Option });
