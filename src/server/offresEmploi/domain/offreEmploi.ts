export interface OffreEmploi {
  id: string;
  intitule: string;
}

export interface OffreEmploiFiltre {
  motClé?: string;
  page: number;
}

export const NOMBRE_RESULTATS_PAR_PAGE = 40;
