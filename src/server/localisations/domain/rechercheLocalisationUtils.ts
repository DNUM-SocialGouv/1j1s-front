export default class RechercheLocalisationUtils {
  private static CODE_POSTAL_LENGTH = 5;
  private static DEPARTEMENT_LENGTH = 2;

  static isRechercheByNumeroCodePostal(recherche: string): boolean {
    return this.checkRechercheOnlyNumber(this.CODE_POSTAL_LENGTH, recherche);
  }

  static isRechercheByNumeroDepartement(recherche: string): boolean {
    return this.checkRechercheOnlyNumber(this.DEPARTEMENT_LENGTH, recherche);
  }

  static checkRechercheOnlyNumber(length: number, recherche: string): boolean {
    return new RegExp(/^\d*$/).test(recherche) && recherche.length === length;
  }
}
