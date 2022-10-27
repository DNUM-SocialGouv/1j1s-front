import {
  Offre,
  RéférentielDomaine,
} from '~/server/offres/domain/offre';

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
