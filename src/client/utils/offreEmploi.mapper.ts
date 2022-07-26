import {
  OffreEmploi,
  RéférentielDomaine,
} from '~/server/offresEmploi/domain/offreEmploi';

export function mapTypeDeContratToOffreEmploiCheckboxFiltre(typeDeContratList: OffreEmploi.TypeDeContrat[]): OffreEmploi.CheckboxFiltre[] {
  return typeDeContratList.map((typeDeContrat) => {
    return {
      libellé: typeDeContrat.libelléCourt,
      valeur: typeDeContrat.valeur as string,
    };
  });
}

export function mapRéférentielDomaineToOffreEmploiCheckboxFiltre(domaineList: RéférentielDomaine[]): OffreEmploi.CheckboxFiltre[] {
  return domaineList.map((domaine) => {
    return {
      libellé: domaine.libelle,
      valeur: domaine.code,
    };
  });
}

export function générerTitreFiltre(multiple: boolean, inputCourant: string): string {
  let titre;
  multiple ? titre = 'Sélectionnez vos choix': titre = 'Sélectionnez votre choix';
  return `${titre} ${inputCourant !== '' && inputCourant.split(',').length > 0 ? `(${inputCourant.split(',').length})` : ''}`;
}
