import React, { useMemo } from 'react';

import { useCombobox } from './ComboboxContext';

type SyncMessageProps = React.ComponentPropsWithoutRef<'li'>

const MESSAGE_PAS_RESULTAT_DEFAULT = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie est valide';
export const SyncMessagePasDeResultat = React.forwardRef<HTMLLIElement, SyncMessageProps>(function SyncMessage({ ...liProps }, ref) {
	const { state: { visibleOptions } } = useCombobox();

	const numberVisibleOptions = useMemo(() => visibleOptions.length, [visibleOptions]);

	return numberVisibleOptions === 0 &&
		<li role={'status'} {...liProps} ref={ref}>{liProps.children ?? MESSAGE_PAS_RESULTAT_DEFAULT}</li>;
});
