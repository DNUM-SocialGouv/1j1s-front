export default class RechercheLocalisationUtils {
  private static CODE_POSTAL_LENGTH = 5;
  private static DEPARTEMENT_LENGTH_METROPOLE = 2;
  private static DEPARTEMENT_LENGTH_DOMTOM = 3;

  static isRechercheByNumeroCodePostal(recherche: string): boolean {
    return this.checkRechercheOnlyNumber(this.CODE_POSTAL_LENGTH, recherche);
  }

  static isRechercheByNumeroDepartement(recherche: string): boolean {
    return this.checkRechercheOnlyNumber(this.DEPARTEMENT_LENGTH_METROPOLE, recherche) ||
          this.checkRechercheOnlyNumber(this.DEPARTEMENT_LENGTH_DOMTOM, recherche);
  }

  static checkRechercheOnlyNumber(length: number, recherche: string): boolean {
    return new RegExp(/^\d*$/).test(recherche) && recherche.length === length;
  }
}
