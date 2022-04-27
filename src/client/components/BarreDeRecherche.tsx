import React from "react";

interface BarreDeRechercheProps {
  placeholder?: string;
  inputName: string;
  icon?: string;
}

export const BarreDeRecherche = (props: BarreDeRechercheProps) => {
  const { inputName, placeholder, icon } = props;

  return (
    <div className="fr-search-bar" id="header-search" role="search">
      <label className="fr-label" htmlFor={inputName}>
        Recherche
      </label>
      <input
        className="fr-input"
        placeholder={placeholder ?? "Rechercher"}
        type="search"
        id="search-784-input"
        name={inputName}
      />
      <span
        className={["fr-btn", icon ?? "fr-icon-zoom-line"].join(" ")}
        aria-hidden="true"
      />
    </div>
  );
};
