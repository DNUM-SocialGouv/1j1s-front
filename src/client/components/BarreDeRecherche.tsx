import React, { ChangeEvent } from 'react';

interface BarreDeRechercheProps {
  placeholder?: string;
  inputName: string;
  icon?: string;
  onChange: (value: string) => void
}

export const BarreDeRecherche = (props: BarreDeRechercheProps) => {
  const { inputName, placeholder, icon, onChange } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onChange(value);
  };
  return (
    <div className="fr-search-bar" id="header-search" role="search">
      <label className="fr-label" htmlFor={inputName}>
        Recherche
      </label>
      <input
        className="fr-input"
        placeholder={placeholder ?? 'Rechercher'}
        type="search"
        id="search-784-input"
        name={inputName}
        onChange={handleChange}
      />
      <span
        className={['fr-btn', icon ?? 'fr-icon-zoom-line'].join(' ')}
        aria-hidden="true"
      />
    </div>
  );
};
