import { Offre, RéférentielDomaine } from '~/server/offres/domain/offre';

export function mapTypeDeContratToOffreEmploiCheckboxFiltre(typeDeContratList: Offre.TypeDeContrat[]): Offre.CheckboxFiltre[] {
  return typeDeContratList.map((typeDeContrat) => {
    return {
      libellé: typeDeContrat.libelléCourt,
      valeur: typeDeContrat.valeur.toString(),
    };
  });
}

export function mapRéférentielDomaineToOffreCheckboxFiltre(domaineList: RéférentielDomaine[]): Offre.CheckboxFiltre[] {
  return domaineList.map((domaine) => {
    return {
      libellé: domaine.libelle,
      valeur: domaine.code,
    };
  });
}
