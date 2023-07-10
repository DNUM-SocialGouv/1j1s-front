import React, { useCallback, useEffect,useId, useState } from 'react';

import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import { useCombobox } from './ComboboxContext';
import { matchesInput } from './utils';

type OptionProps = Omit<React.ComponentPropsWithoutRef<'li'>, 'value'> & {
	value?: { toString: () => string },
};
export const Option = React.forwardRef<HTMLLIElement, OptionProps>(function Option({
	id: idProps,
	onClick: onClickProps,
	value,
	...optionProps
}, outerRef) {
	const ref = useSynchronizedRef(outerRef);
	const localId = useId();
	const id = idProps ?? localId;
	const {
		state: { activeDescendant, value: inputValue },
		onOptionSelection,
	} = useCombobox();
	const selected = activeDescendant === id;
	const [ hidden, setHidden ] = useState(false);

	useEffect(function checkIfHidden() {
		setHidden(!matchesInput(ref.current, inputValue));
	}, [inputValue, ref]);

	const onClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
		onOptionSelection(event.currentTarget);
		if (onClickProps) {
			onClickProps(event);
		}
	}, [onClickProps, onOptionSelection]);
	return (
		<li
			role="option"
			aria-selected={selected}
			hidden={hidden}
			id={id}
			tabIndex={-1}
			onClick={onClick}
			ref={ref}
			data-value={value?.toString()}
			{...optionProps}
		/>
	);
});
