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

export function mapExpérienceAttendueToOffreEmploiCheckboxFiltre(expérienceList: OffreEmploi.ExpérienceAttendu[]): OffreEmploi.CheckboxFiltre[] {
  return expérienceList.map((expérience) => {
    return {
      libellé: expérience.libellé,
      valeur: expérience.valeur,
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

export function générerTitreFiltre(titre: string, inputCourant: string): string {
  return `${titre} ${inputCourant !== '' && inputCourant.split(',').length > 0 ? `(${inputCourant.split(',').length})` : ''}`;
}
