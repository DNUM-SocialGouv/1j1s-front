import { Alternance } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import Matcha = AlternanceApiJobsResponse.Matcha;
import PEJobs = AlternanceApiJobsResponse.PEJobs;

function sanitizeEscapeSequences(texte?: string) {
	if (!texte) return texte;
	return JSON.parse(`"${texte}"`);
}

export function mapMatcha(alternance: Matcha): Alternance {
	return {
		compétences: alternance.job.romeDetails?.competencesDeBase?.map((compétence) => compétence.libelle),
		dateDébut: alternance.job.jobStartDate != null ? new Date(alternance.job.jobStartDate) : undefined,
		description: sanitizeEscapeSequences(alternance.job.romeDetails?.definition),
		durée: alternance.job.dureeContrat,
		entreprise: {
			adresse: alternance.company?.place?.city,
			nom: alternance.company?.name,
			téléphone: alternance.contact?.phone,
		},
		id: alternance.job.id,
		localisation: alternance.place?.fullAddress || alternance.place?.city,
		niveauRequis: alternance.diplomaLevel,
		rythmeAlternance: alternance.job.rythmeAlternance,
		source: Alternance.Source.MATCHA,
		tags: [alternance.place?.city, alternance.job.contractType?.toString(), alternance.diplomaLevel].filter((tag) => !!tag) as string[],
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType,
	};
}
export function mapPEJob(alternance: PEJobs): Alternance {
	return {
		compétences: alternance.job.romeDetails?.competencesDeBase?.map((compétence) => compétence.libelle),
		dateDébut: alternance.job.jobStartDate != null ? new Date(alternance.job.jobStartDate) : undefined,
		description: sanitizeEscapeSequences(alternance.job.romeDetails?.definition),
		durée: alternance.job.dureeContrat,
		entreprise: {
			adresse: alternance.company?.place?.city,
			nom: alternance.company?.name,
			téléphone: alternance.contact?.phone,
		},
		id: alternance.job.id,
		localisation: alternance.place?.fullAddress || alternance.place?.city,
		niveauRequis: undefined,
		rythmeAlternance: alternance.job.rythmeAlternance,
		source: Alternance.Source.POLE_EMPLOI,
		tags: [alternance.place?.city, Alternance.Contrat.ALTERNANCE, alternance.job.contractType].filter((tag) => !!tag) as string[],
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType ? [alternance.job.contractType] : [],
	};
}
export const mapAlternanceListe = (response: AlternanceApiJobsResponse): Array<Alternance> => {
	const matchas = response.matchas.results.map(mapMatcha);
	const peJobs = response.peJobs.results.map(mapPEJob);
	return matchas.concat(peJobs);
};
