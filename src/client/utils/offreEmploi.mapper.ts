import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { RéférentielDomaine } from '~/server/offresEmploi/domain/référentiel';

export function mapTypeDeContratToOffreEmploiCheckboxFiltre(typeDeContratList: OffreEmploi.TypeDeContrat[]): OffreEmploi.CheckboxFiltre[] {
  return typeDeContratList.map((typeDeContrat) => {
    return {
      libellé: typeDeContrat.libelléCourt,
      valeur: typeDeContrat.valeur as string,
    };
  });
}

export function mapExpérienceAttenduToOffreEmploiCheckboxFiltre(expérienceList: OffreEmploi.ExpérienceAttendu[]): OffreEmploi.CheckboxFiltre[] {
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
