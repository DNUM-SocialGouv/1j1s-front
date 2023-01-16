export interface Image {
  id: string
  value: string
}

export interface AnnonceDeLogementIndexee  {
  titre: string
  slug: string
  dateDeDisponibilite: string
  prix: number
  prixHT?: number
  surfaceAAfficher: string
  type: string
  url: string
  dateDeMiseAJour: string
  localisationAAfficher: string
  devise: string
  imagesUrl: Array<Image>
}
