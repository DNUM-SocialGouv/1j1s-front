import { Alternance } from '~/server/alternances/domain/alternance';

export interface ConsulterOffreAlternanceMatcha extends Alternance {
  débutContrat?: string
  rythmeAlternance?: string
  competencesDeBase?: string[]
  duréeContrat?: number
}



