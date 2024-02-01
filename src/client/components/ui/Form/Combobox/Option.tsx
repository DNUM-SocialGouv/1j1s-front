import React, { useCallback, useEffect, useId, useMemo } from 'react';

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
		state: { activeDescendant, value: inputValue  },
		visibleOptions,
		onOptionSelection,
		filter,
		setVisibleOptions,
	} = useCombobox();
	const selected = activeDescendant === id;

	const isHidden = useMemo(() => {
		return !visibleOptions.includes(id);
	}, [id, visibleOptions]);

	console.log(visibleOptions, 'visibleoptions inside option');
	useEffect(function checkIfHidden() {
		const shouldBeVisible = ref.current === null || filter(ref.current, inputValue);
		console.log(shouldBeVisible, 'shouldBeVisible');
		setVisibleOptions((previous)=> {
			const newState = updateVisibleOptions(previous);
			console.log('should change visible options with', newState);
			return newState;
		});

		function updateVisibleOptions(previousVisibleOptions: Array<string>) {
			const optionWasVisible = previousVisibleOptions.includes(id);
			if (optionWasVisible && !shouldBeVisible) {
				const indexOfOptionVisible = previousVisibleOptions.indexOf(id);
				return previousVisibleOptions.toSpliced(indexOfOptionVisible, 1);
			} else if (!optionWasVisible && shouldBeVisible) {
				return previousVisibleOptions.concat(id);
			}
			return previousVisibleOptions;
		}
	}, [filter, id, inputValue, ref, setVisibleOptions]);

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
