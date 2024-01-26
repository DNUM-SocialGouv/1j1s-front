import React, { useEffect, useState } from 'react';

import { useCombobox } from './ComboboxContext';

type SyncMessageProps = React.ComponentPropsWithoutRef<'li'>;

export const SyncMessage = React.forwardRef<HTMLLIElement, SyncMessageProps>(function SyncMessage({ ...liProps }, ref) {
	const { state: { suggestionList, value } } = useCombobox();

	const [optionsVisibles, setOptionsVisibles]= useState([]);

	useEffect(() => {
		console.log(suggestionList?.current?.querySelectorAll('[role="option"]'), suggestionList?.current?.querySelectorAll('[role="option"]:not([hidden])').length);
		setOptionsVisibles(Array.from(suggestionList?.current?.querySelectorAll('[role="option"]:not([hidden])') ?? []));
	}, [suggestionList.current]);


	return optionsVisibles.length === 0 && <li role={'status'} {...liProps} ref={ref}>Coucouuuu</li>;
});
