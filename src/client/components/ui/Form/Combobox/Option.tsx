import React, { useCallback, useEffect, useId, useMemo } from 'react';

import { ComboboxAction as Actions } from '~/client/components/ui/Form/Combobox/ComboboxReducer';
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
		state: { activeDescendant, visibleOptions, value: inputValue },
		onOptionSelection,
		dispatch,
		filter,
	} = useCombobox();
	const selected = activeDescendant === id;

	const isHidden = useMemo(() => {
		return !visibleOptions.includes(id);
	}, [id, visibleOptions]);

	useEffect(function checkIfHidden() {
		const option = ref.current;
		if (option) {
			const shouldBeVisible = filter(option, inputValue);
			if (!shouldBeVisible) dispatch(new Actions.HideOption(option));
			if (shouldBeVisible) dispatch(new Actions.ShowOption(option));
		}

	}, [dispatch, filter, id, ref, inputValue]);

	const onClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
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
			hidden={isHidden}
			id={id}
			onClick={onClick}
			onMouseDown={onMouseDown}
			ref={ref}
			data-value={value?.toString()}
			{...optionProps}
		/>
	);
});
