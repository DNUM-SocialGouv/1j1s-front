import { OffreFiltre } from '~/server/offres/domain/offre';

export interface EmploiFiltre extends OffreFiltre {
    typeDeContratList?: string[]
    tempsDeTravail?: string
    experienceExigence?: string
    grandDomaineList?: string[]
}
