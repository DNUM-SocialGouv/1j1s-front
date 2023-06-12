import React, { KeyboardEvent, useCallback, useState } from 'react';

type ComboboxProps = React.ComponentPropsWithoutRef<'input'> & {
	children: React.ReactNode,
};

const ComboboxComponent = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox({
	children,
	onKeyDown: onKeyDownProps,
	...inputProps
}, ref) {
	const [open, setOpen] = useState(false);
	const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
		setOpen(true);
		if (onKeyDownProps) {
			onKeyDownProps(event);
		}
	}, [onKeyDownProps]);
	return (
		<div>
			<input {...inputProps} ref={ref} onKeyDown={onKeyDown}/>
			<ul role="listbox" hidden={!open}>{children}</ul>
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
