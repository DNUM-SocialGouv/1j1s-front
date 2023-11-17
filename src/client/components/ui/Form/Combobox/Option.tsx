import React, { useCallback, useEffect,useId, useState } from 'react';

import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import { useCombobox } from './ComboboxContext';

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
		filter,
	} = useCombobox();
	const selected = activeDescendant === id;
	const [ hidden, setHidden ] = useState(false);

	useEffect(function checkIfHidden() {
		setHidden(ref.current != null && !filter(ref.current, inputValue));
	}, [filter, inputValue, ref]);

	const onClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
		console.log(`ici ?? ${event.currentTarget}`)
		onOptionSelection(event.currentTarget);
		if (onClickProps) {
			onClickProps(event);
		}
	}, [onClickProps, onOptionSelection]);
	// NOTE (GAFI 13-07-2023): Sinon on perd le focus avant la fin du clique ==> élément invalid pour la sélection.
	const onMouseDown = useCallback(function preventBlurOnOptionSelection(event: React.MouseEvent<HTMLLIElement>) {
		event.preventDefault();
	}, []);
	return (
		<li
			role="option"
			aria-selected={selected}
			hidden={hidden}
			id={id}
			onClick={onClick}
			onMouseDown={onMouseDown}
			ref={ref}
			data-value={value?.toString()}
			{...optionProps}
		/>
	);
});
