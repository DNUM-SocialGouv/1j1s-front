import { Alternance } from '~/server/alternances/domain/alternance';

export interface AlternanceFromMatcha extends Alternance {
  débutContrat?: string
  rythmeAlternance?: string
  competencesDeBase?: string[]
  duréeContrat?: number
}



