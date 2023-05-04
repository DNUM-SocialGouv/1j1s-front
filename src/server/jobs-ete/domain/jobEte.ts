import { OffreFiltre } from '~/server/offres/domain/offre';

export interface JobEteFiltre extends OffreFiltre {
	grandDomaineList?: string[];
}
