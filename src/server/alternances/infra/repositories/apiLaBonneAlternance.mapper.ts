import { Alternance } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import Matcha = AlternanceApiJobsResponse.Matcha;
import PEJobs = AlternanceApiJobsResponse.PEJobs;

function sanitizeEscapeSequences(alternance: { niveauRequis: string | undefined; titre: string; localisation: string | undefined; description: string | undefined; nomEntreprise: string | undefined; typeDeContrat: string | undefined; id: string }) {
	return JSON.parse(JSON.stringify(alternance).replace(/\\\\/g, '\\'));
}

export function mapAlternance(matcha: Matcha): Alternance {
	const alternance = {
		description: matcha.job.romeDetails?.definition,
		id: matcha.job.id,
		localisation: matcha.place?.city,
		niveauRequis: matcha.diplomaLevel,
		nomEntreprise: matcha.company?.name,
		source: Alternance.Source.MATCHA,
		tags: [matcha.place?.city, matcha.job.contractType, matcha.diplomaLevel].filter((tag) => !!tag) as string[],
		titre: matcha.title,
		typeDeContrat: [matcha.job.contractType],
	};
	return sanitizeEscapeSequences(alternance);
}
export function mapPEJob(alternance: PEJobs): Alternance {
	return {
		description: alternance.job.romeDetails?.definition,
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
