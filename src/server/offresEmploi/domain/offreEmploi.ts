export interface OffreEmploi {
  id: string;
  intitule: string;
  description?: string;
  qualificationLibelle?: string;
  typeContrat?: string;
  dureeTravailLibelleConverti?: string;
  entreprise?: Entreprise;
}

interface Entreprise {
  nom: string;
}

export interface OffreEmploiFiltre {
  motClé?: string;
  page: number;
}

export const NOMBRE_RESULTATS_PAR_PAGE = 40;
