import React, { SyntheticEvent, useCallback } from 'react';

import InputAutocomplétion from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétion';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation.service';
import { Commune } from '~/client/services/localisations/domain/localisationAvecCoordonnées';
import { isSuccess } from '~/server/errors/either';

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

export default function InputAutocomplétionCommune(props: AutocomplétionCommuneProps) {
  const { onSuggestionSelected, valeurInitiale, ...rest } = props;
  const localisationService = useDependency<LocalisationService>('localisationService');

  const suggestionsAdresse = useCallback(async (préfixe: string) => {
    const response = await localisationService.rechercherCommune(préfixe);
    if (isSuccess(response)) {
      return response.result.résultats;
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
