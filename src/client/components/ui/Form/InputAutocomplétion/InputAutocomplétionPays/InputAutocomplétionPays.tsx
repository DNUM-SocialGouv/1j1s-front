import { uuid4 } from '@sentry/utils';
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
	const { codePays, name, id, ...rest } = props;
	const [selectedPays, setSelectedPays] = useState<Pays | undefined>(undefined);
	const inputId = useRef(id || uuid4());

	useEffect(() => {
		inputId.current = id || uuid4();
	}, [id]);

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
				id={inputId.current}
				{...rest}
			/>
			<input name={name} id={inputId.current} type="hidden" value={selectedPays?.code || ''}/>
		</>
	);
};
