import { Alternance } from '~/server/alternances/domain/alternance';

export type ConsulterOffreAlternance = ConsulterOffreAlternanceMatcha | ConsulterOffreAlternancePeJob

export interface ConsulterOffreAlternanceMatcha extends Alternance {
  débutContrat?: string
  rythmeAlternance?: string
  competencesDeBase?: string[]
  duréeContrat?: number
}


export interface ConsulterOffreAlternancePeJob extends Alternance {
  url?: string
  duréeContrat?: string
}
