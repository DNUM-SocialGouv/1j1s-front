import React, { SyntheticEvent, useCallback } from 'react';

import InputAutocomplétion from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétion';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { isSuccess } from '~/server/errors/either';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

interface AutocomplétionCommuneProps {
  onSuggestionSelected?(event: SyntheticEvent, suggestion: Commune, suggestionValue: string, suggestionIndex: number, sectionIndex: number | null, method: string): void;

  id?: string;
  valeurInitiale ?: Commune
  label?: string;
  debounce?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

const MINIMUM_QUERY_LENGTH = process.env.API_ADRESSE_MINIMUM_QUERY_LENGTH ?? 0;

export default function InputAutocomplétionCommune(props: AutocomplétionCommuneProps) {
	const { onSuggestionSelected, valeurInitiale, ...rest } = props;
	const localisationService = useDependency<LocalisationService>('localisationService');

	const suggestionsAdresse = useCallback(async (préfixe: string) => {
		if (préfixe.length >= MINIMUM_QUERY_LENGTH) {
			const response = await localisationService.rechercherCommune(préfixe);
			if (isSuccess(response)) {
				return response.result.résultats;
			} else {
				return [];
			}
		} else {
			return [];
		}
	}, [localisationService]);

	function afficherSuggestion(suggestion: Commune) {
		return suggestion.libelle;
	}

	function valeurSuggestion(suggestion: Commune) {
		return suggestion.libelle;
	}

	return <InputAutocomplétion
		suggérer={suggestionsAdresse}
		afficher={afficherSuggestion}
		valeur={valeurSuggestion}
		onSuggestionSelected={onSuggestionSelected}
		valeurInitiale={valeurInitiale?.libelle}
		{...rest}
	/>;
}
