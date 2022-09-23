import React, { SyntheticEvent } from 'react';

import InputAutocomplétion from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétion';

export interface SecteurActivité {
  libellé: string;
  valeur: string;
}

interface SecteurActivitéProps {
  onSuggestionSelected?(event: SyntheticEvent, suggestion: SecteurActivité, suggestionValue: string, suggestionIndex: number, sectionIndex: number | null, method: string): void;

  id: string;
  valeurInitiale?: SecteurActivité;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

const suggestions: SecteurActivité[] = [
  { libellé: 'Activités de services administratifs et de soutien', valeur: 'administrative-support' },
  {
    libellé: 'Activités des ménages en tant qu\'employeurs, activités indifférenciées des ménages en tant que producteurs de biens et services pour usage propre',
    valeur: 'households-employers',
  },
  { libellé: 'Activités extra-territoriales', valeur: 'extra-territorial' },
  { libellé: 'Activités financières et d\'assurance', valeur: 'financial-insurance' },
  { libellé: 'Activités immobilières', valeur: 'real-estate' },
  { libellé: 'Activités spécialisées, scientifiques et techniques', valeur: 'scientific-technical' },
  { libellé: 'Administration publique / Fonction publique d\'Etat', valeur: 'public-administration' },
  { libellé: 'Agriculture, sylviculture et pêche', valeur: 'agriculture' },
  { libellé: 'Arts, spectacles et activités récréatives', valeur: 'entertainment' },
  { libellé: 'Autres activités de services', valeur: 'other-services' },
  { libellé: 'Commerce, réparation d\'automobiles et de motocycles', valeur: 'car-bike' },
  { libellé: 'Construction', valeur: 'construction' },
  { libellé: 'Enseignement', valeur: 'teaching' },
  { libellé: 'Fonction publique hospitalière', valeur: 'public-hospistal' },
  { libellé: 'Fonction publique territoriale', valeur: 'public-territorial' },
  { libellé: 'Hébergement et restauration', valeur: 'accommodation-catering' },
  { libellé: 'Industrie manufacturière', valeur: 'industry-manufacturing' },
  { libellé: 'Industries extractives', valeur: 'industry-extraction' },
  { libellé: 'Information et communication', valeur: 'information-communication' },
  { libellé: 'Production et distribution d\'eau, assainissement, gestion des déchets et dépollution', valeur: 'production-distribution-water' },
  { libellé: 'Production et distribution d\'électricité, de gaz, de vapeur et d\'air conditionné', valeur: 'production-distribution-power' },
  { libellé: 'Santé humaine et action sociale', valeur: 'health-social' },
  { libellé: 'Transports et entreposage', valeur: 'transport-storage' },
  { libellé: 'Autre', valeur: 'other' },
];

export default function InputAutocomplétionSecteurActivité(props: SecteurActivitéProps) {
  const { onSuggestionSelected, valeurInitiale, ...rest } = props;

  async function suggestionsSecteurActivité(préfixe: string): Promise<SecteurActivité[]> {
    const result = [];
    for (const suggestion of suggestions) {
      if (suggestion.libellé.toLowerCase().startsWith(préfixe.trim().toLowerCase())) {
        result.push(suggestion);
      }
    }
    return result;
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
