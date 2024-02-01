import React, { useEffect, useState } from 'react';

import { useCombobox } from './ComboboxContext';

type SyncMessageProps = React.ComponentPropsWithoutRef<'li'>

export const SyncMessagePasDeResultat = React.forwardRef<HTMLLIElement, SyncMessageProps>(function SyncMessage({  ...liProps }, ref) {
	const { state: { visibleOptions } } = useCombobox();
	const [nbreElement, setNbreElement] = useState(0);
	useEffect(() => {
		setNbreElement(visibleOptions.length);
	}, [visibleOptions]);

	return nbreElement === 0 && <li role={'status'} {...liProps} ref={ref}/>;
});
