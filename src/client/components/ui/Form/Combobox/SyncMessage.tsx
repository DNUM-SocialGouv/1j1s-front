import React, { useEffect, useState } from 'react';

import { useCombobox } from './ComboboxContext';

type SyncMessageProps = React.ComponentPropsWithoutRef<'li'>;

export const SyncMessage = React.forwardRef<HTMLLIElement, SyncMessageProps>(function SyncMessage({ ...liProps }, ref) {
	const { visibleOptions } = useCombobox();
	const [nbreElement, setNbreElement] = useState(0);
	useEffect(() => {
		console.log('update nbre element', visibleOptions.length);
		setNbreElement(visibleOptions.length);
	}, [visibleOptions]);

	return nbreElement === 0 && <li role={'status'} {...liProps} ref={ref}>0 résultat</li>;
});
