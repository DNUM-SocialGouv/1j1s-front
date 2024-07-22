import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, useCallback } from 'react';

import { OptionSelect } from './Select';
import styles from './Select.module.scss';
import { useSelect } from './SelectContext';

type SelectOptionPropsOption = {
	option: OptionSelect
}

type SelectOptionProps = ComponentPropsWithoutRef<'li'>

export function SelectOption({ option, className }: SelectOptionProps & SelectOptionPropsOption) {
	const id = option.libellé;
	const { onOptionSelection, activeDescendant, isCurrentItemSelected } = useSelect();

	// NOTE (BRUJ 17-05-2023): Sinon on perd le focus avant la fin du clique ==> élément invalid pour la sélection.
	const onMouseDown = useCallback(function preventBlurOnOptionSelection(event: React.MouseEvent<HTMLLIElement>) {
		event.preventDefault();
	}, []);

	return <li
		className={classNames(className, activeDescendant === id ? styles.optionVisuallyFocus : '')}
		id={id}
		role="option"
		onMouseDown={onMouseDown}
		data-value={option.valeur}
		onClick={() => onOptionSelection(id)}
		aria-selected={isCurrentItemSelected(option.valeur)}>
		{option.libellé}
	</li>;
}
