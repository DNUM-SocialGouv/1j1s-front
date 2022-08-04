export default class RechercheLocalisationUtils {
  private static CODE_POSTAL_LENGTH = 5;
  private static DEPARTEMENT_LENGTHS = [2, 3];

  static isRechercheByNumeroCodePostal(recherche: string): boolean {
    return this.checkRechercheOnlyNumber(this.CODE_POSTAL_LENGTH, recherche);
  }

  static isRechercheByNumeroDepartement(recherche: string): boolean {
    return this.checkRechercheOnlyNumber(this.DEPARTEMENT_LENGTHS[0], recherche) ||
          this.checkRechercheOnlyNumber(this.DEPARTEMENT_LENGTHS[1], recherche);
  }

  static checkRechercheOnlyNumber(length: number, recherche: string): boolean {
    return new RegExp(/^\d*$/).test(recherche) && recherche.length === length;
  }
}
