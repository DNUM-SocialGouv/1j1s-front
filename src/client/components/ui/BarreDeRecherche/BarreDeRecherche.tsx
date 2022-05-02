import React from 'react';

interface BarreDeRechercheProps {
  placeholder?: string;
  inputName: string;
}

export const BarreDeRecherche = (props: BarreDeRechercheProps) => {
  const { inputName, placeholder } = props;
  return (
    <div className="fr-search-bar">
      <label className="fr-label" htmlFor={inputName}>
        Recherche
      </label>
      <input
        className="fr-input"
        placeholder={placeholder ?? 'Rechercher'}
        type="search"
        id={inputName}
        name={inputName}
      />
      <span
        className="fr-btn fr-icon-zoom-line"
        aria-hidden="true"
      />
    </div>
  );
};
