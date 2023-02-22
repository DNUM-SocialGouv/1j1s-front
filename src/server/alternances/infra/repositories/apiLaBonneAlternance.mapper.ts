import { Alternance } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import Matcha = AlternanceApiJobsResponse.Matcha;
import PEJobs = AlternanceApiJobsResponse.PEJobs;

export function mapAlternance(alternance: Matcha): Alternance {
	return {
		description: alternance.job.description,
		id: alternance.job.id,
		localisation: alternance.place?.city,
		niveauRequis: alternance.diplomaLevel,
		nomEntreprise: alternance.company?.name,
		source: Alternance.Source.MATCHA,
		tags: [alternance.place?.city, alternance.job.contractType, alternance.diplomaLevel].filter((tag) => !!tag) as string[],
		titre: alternance.title,
		typeDeContrat: [alternance.job.contractType],
	};
}
export function mapPEJob(alternance: PEJobs): Alternance {
	return {
		description: alternance.job.description,
		id: alternance.job.id,
		localisation: alternance.place?.city,
		niveauRequis: undefined,
		nomEntreprise: alternance.company?.name,
		source: Alternance.Source.POLE_EMPLOI,
		tags: [alternance.place?.city, Alternance.Contrat.ALTERNANCE, alternance.job.contractType].filter((tag) => !!tag) as string[],
		titre: alternance.title,
		typeDeContrat: [alternance.job.contractType],
	};
}
export const mapAlternanceListe = (response: AlternanceApiJobsResponse): Array<Alternance> => {
	const matchas = response.matchas.results.map(mapAlternance);
	const peJobs = response.peJobs.results.map(mapPEJob);
	return matchas.concat(peJobs);
};
