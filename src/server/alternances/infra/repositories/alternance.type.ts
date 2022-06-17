import { Alternance } from '~/server/alternances/domain/alternance';

export type RésultatRechercheAlternance = AlternanceFromPoleEmploi | AlternanceFromMatcha

export namespace AlternanceFromPoleEmploi {
  export interface Contact {
    info?: string
    téléphone?: string
  }
}

export interface AlternanceFromMatcha extends Alternance {
  débutContrat?: string
  rythmeAlternance?: string
  competencesDeBase?: string[]
  duréeContrat?: number
}

export interface AlternanceFromPoleEmploi extends Alternance {
  url: string
  duréeContrat?: string
}

