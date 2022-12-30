import React, { SyntheticEvent } from 'react';

import InputAutocomplétion from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétion';
import { SecteurDActivité } from '~/server/entreprises/domain/Entreprise';

export interface SecteurActivité {
  libellé: string;
  valeur: string;
}

interface SecteurActivitéProps {
  onSuggestionSelected?(event: SyntheticEvent, suggestion: SecteurActivité, suggestionValue: string, suggestionIndex: number, sectionIndex: number | null, method: string): void;

  id?: string;
  valeurInitiale?: SecteurActivité;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

function compareSecteurActivités(a: SecteurActivité, b: SecteurActivité): number {
	if (a.libellé.startsWith('Autre')) return 1;
	if (b.libellé.startsWith('Autre')) return -1;

	return a.libellé.localeCompare(b.libellé);
}

const suggestions: SecteurActivité[] = Object.entries(SecteurDActivité).map(([valeur, libellé]) => ({
	libellé,
	valeur,
})).sort(compareSecteurActivités);

export default function InputAutocomplétionSecteurActivité(props: SecteurActivitéProps) {
	const { onSuggestionSelected, valeurInitiale, ...rest } = props;

	function isMatch(secteur: SecteurActivité, préfixe: string): boolean {
		const libelléSecteurNormalisé = secteur.libellé.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		const préfixeNormalisé = préfixe.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

		return libelléSecteurNormalisé.startsWith(préfixeNormalisé);
	}

	async function suggestionsSecteurActivité(préfixe: string): Promise<SecteurActivité[]> {
		return suggestions.filter((secteur) => isMatch(secteur, préfixe));
	}

	function afficherSuggestion(suggestion: SecteurActivité) {
		return suggestion.libellé;
	}

	function valeurSuggestion(suggestion: SecteurActivité) {
		return suggestion.libellé;
	}

	return <InputAutocomplétion
		debounce={1}
		suggérer={suggestionsSecteurActivité}
		afficher={afficherSuggestion}
		valeur={valeurSuggestion}
		onSuggestionSelected={onSuggestionSelected}
		valeurInitiale={valeurInitiale?.libellé}
		shouldRenderSuggestions={() => true}
		{...rest}
	/>;
}
