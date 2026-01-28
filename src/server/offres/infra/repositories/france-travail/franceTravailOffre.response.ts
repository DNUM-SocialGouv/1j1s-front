export interface OffreResponse {
  id: string
  intitule: string
  description?: string
  formations?: OffreResponseFormation[]
  competences?: OffreResponseCompétence[]
  qualitesProfessionnelles?: OffreResponseQualitéeProfessionnelle[]
  lieuTravail?: OffreResponseLieuTravail
  entreprise?: OffreResponseEntreprise
  salaire?: OffreResponseSalaire
  typeContrat: OffreResponseTypeContrat
  experienceExige?: OffreResponseExpérience
  dureeTravailLibelleConverti?: OffreResponseDuréeTravail
  origineOffre: OffreResponseOrigineOffre
}

export type OffreResponseExpérience = 'D' | 'S' | 'E';

export type OffreResponseDuréeTravail = 'Temps plein' | 'Temps partiel';

export type OffreResponseTypeContrat = 'CDI' | 'CDD' | 'MIS' | 'SAI'

export interface OffreResponseLieuTravail {
  libelle: string
}

export interface OffreResponseEntreprise {
  nom?: string
  logo?: string
}

export interface OffreResponseSalaire {
  libelle?: string
  commentaire?: string
}

export interface OffreResponseFormation {
  niveauLibelle?: string
  commentaire?: string
}

export interface OffreResponseQualitéeProfessionnelle {
  libelle?: string
}

export interface OffreResponseCompétence {
  libelle?: string
}

export interface OffreResponseOrigineOffre {
  urlOrigine: string
}

export interface RésultatsRechercheOffreResponse {
  resultats: OffreResponse[]
  filtresPossibles?: RésultatsRechercheOffreResponseFiltresPossibles[]
}

export interface RésultatsRechercheOffreResponseFiltresPossibles {
  agregation: RésultatsRechercheOffreResponseAgregation[]
}

export interface RésultatsRechercheOffreResponseAgregation {
  nbResultats: number
}
