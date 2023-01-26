import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';

import InputAutocomplétion from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétion';
import { Pays, paysList } from '~/client/domain/pays';

interface PaysPros {
	id?: string
	codePays?: string
	label?: string
	name?: string
	placeholder?: string
	required?: boolean
}

const DEBOUNCE_TIMEOUT = 1;

export default function InputAutocomplétionPays(props: PaysPros) {
	const { codePays, name, ...rest } = props;
	const [selectedPays, setSelectedPays] = useState<Pays | undefined>(undefined);

	const libelléPaysInitial = useMemo(() => {
		if (codePays) {
			return paysList
				.find((pays) => pays.code === codePays)
				?.libellé || undefined;
		} else {
			return undefined;
		}
	}, [codePays]);

	useEffect(() => {
		if (codePays && libelléPaysInitial) {
			setSelectedPays({ code: codePays, libellé: libelléPaysInitial });
		}
	}, [codePays, libelléPaysInitial]);

	const suggérerPays = useCallback((input: string): Pays[] => {
		const inputValue = input.trim().toLowerCase();

		return paysList.filter((pays) =>
			pays.libellé.trim().toLowerCase().startsWith(inputValue));
	}, []);

	const getSuggestionLibellé = useCallback((suggestion: Pays) => {
		return suggestion.libellé;
	}, []);

	const onPaysChange = useCallback((event: SyntheticEvent, suggestion: Pays) => {
		setSelectedPays(suggestion);
	}, []);

	return (
		<>
			<InputAutocomplétion
				debounce={DEBOUNCE_TIMEOUT}
				suggérer={suggérerPays}
				afficher={getSuggestionLibellé}
				valeur={getSuggestionLibellé}
				onSuggestionSelected={onPaysChange}
				valeurInitiale={libelléPaysInitial}
				{...rest}
			/>
			<input name={name} type="hidden" value={selectedPays?.code || ''}/>
		</>
	);
};
