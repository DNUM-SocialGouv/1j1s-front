import classNames from 'classnames';
import React, { useCallback, useId } from 'react';

import styles from './Select.module.scss';
import { useSelectContext } from './SelectContext';

type SelectOptionProps = Omit<React.ComponentPropsWithoutRef<'li'>, 'value'> & {
	value: { toString: () => string },
};

export function SelectOption({ className, value: valueProps, id: idProps, ...rest }: SelectOptionProps) {
	const value = valueProps.toString();
	const defaultId = useId();
	const id = idProps ?? value ?? defaultId;
	const { onOptionSelection, activeDescendant, isCurrentItemSelected } = useSelectContext();

	// NOTE (BRUJ 17-05-2023): Sinon on perd le focus avant la fin du clique ==> élément invalid pour la sélection.
	const onMouseDown = useCallback(function preventBlurOnOptionSelection(event: React.MouseEvent<HTMLLIElement>) {
		event.preventDefault();
	}, []);

	return <li
		className={classNames(className, { [styles.optionVisuallyFocus] : activeDescendant === id })}
		id={id}
		role="option"
		onMouseDown={onMouseDown}
		data-value={value.toString()}
		onClick={() => onOptionSelection(id)}
		aria-selected={isCurrentItemSelected(value)}
		{...rest}>
	</li>;
}
