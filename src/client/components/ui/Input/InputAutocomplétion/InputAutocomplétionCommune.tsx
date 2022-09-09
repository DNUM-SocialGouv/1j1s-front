import React from 'react';

import InputAutocomplétion from '~/client/components/ui/Input/InputAutocomplétion/InputAutocomplétion';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation.service';
import { LocalisationApiResponse } from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

interface AutocomplétionCommuneProps {
  label?: string;
  debounce?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export default function InputAutocomplétionCommune(props: AutocomplétionCommuneProps) {
  const { ...rest } = props;
  const localisationService = useDependency<LocalisationService>('localisationService');

  async function suggestionsAdresse(préfixe: string) {
    const résultat = await localisationService.rechercherLocalisation(préfixe);
    return résultat ? résultat.communeList : [];
  }

  function afficherSuggestion(suggestion: LocalisationApiResponse) {
    return suggestion.libelle;
  }

  function valeurSuggestion(suggestion: LocalisationApiResponse) {
    return suggestion.libelle;
  }

  return <InputAutocomplétion
    suggérer={suggestionsAdresse}
    afficher={afficherSuggestion}
    valeur={valeurSuggestion}
    {...rest}
  />;
}
