import { Alternance } from '~/server/alternances/domain/alternance';

export type RésultatRechercheAlternance = AlternanceFromPoleEmploi | AlternanceFromMatcha

export namespace AlternanceFromPoleEmploi {
  export interface Contact {
    info?: string
    téléphone?: string
  }
}

export interface AlternanceFromMatcha extends Alternance {
  débutContrat: string
  rythmeAlternance: string
  competencesDeBase: string[]
  duréeContrat: number
  contact: AlternanceFromMatcha.Contact
}

export namespace AlternanceFromMatcha {
  export interface Contact {
    nom?: string
    téléphone?: string
  }
}

export interface AlternanceFromPoleEmploi extends Alternance {
  url?: string
  contact: AlternanceFromPoleEmploi.Contact
  duréeContrat: string
}

