import classNames from 'classnames';
import React, { useCallback } from 'react';

import { OptionSelect } from './Select';
import styles from './Select.module.scss';
import { useSelectSimple } from './SelectSimpleContext';

type SelectOptionProps = {
	option: OptionSelect
}

export function SelectOption({ option }: SelectOptionProps) {
	const id = option.libellé;
	const { onOptionSelection, state, isCurrentItemSelected } = useSelectSimple();

	// NOTE (BRUJ 17-05-2023): Sinon on perd le focus avant la fin du clique ==> élément invalid pour la sélection.
	const onMouseDown = useCallback(function preventBlurOnOptionSelection(event: React.MouseEvent<HTMLLIElement>) {
		event.preventDefault();
	}, []);


	return <li
		className={classNames(styles.optionComboboxSimple, state.activeDescendant === id ? styles.optionVisuallyFocus : '')}
		id={id}
		role="option"
		onMouseDown={onMouseDown}
		data-value={option.valeur}
		onClick={() => onOptionSelection(id)}
		aria-selected={isCurrentItemSelected(option.valeur)}>
		{option.libellé}
	</li>;
}
