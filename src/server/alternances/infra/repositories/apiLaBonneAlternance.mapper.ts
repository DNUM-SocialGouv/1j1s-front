import { Alternance } from '~/server/alternances/domain/alternance';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import {
	AlternanceApiJobsResponse,
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';


export const mapAlternance = (response: AlternanceApiJobsResponse): Array<Alternance> => {
	const matchas = response.matchas.results.map((alternance) => {
		return {
			localisation: alternance.place?.city,
			niveauRequis: alternance.diplomaLevel,
			nomEntreprise: alternance.company?.name,
			source: Alternance.Source.MATCHA,
			tags: [alternance.place?.city, ...alternance.job.contractType, alternance.diplomaLevel].filter((tag) => !!tag) as string[],
			titre: alternance.title,
			typeDeContrat: alternance.job.contractType,
		};
	});
	const peJobs = response.peJobs.results.map((alternance) => ({
		localisation: alternance.place?.city,
		niveauRequis: undefined,
		nomEntreprise: alternance.company?.name,
		source: Alternance.Source.POLE_EMPLOI,
		tags: [alternance.place?.city, Alternance.Contrat.ALTERNANCE, ...alternance.job.contractType].filter((tag) => !!tag) as string[],
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType,
	}));
	return matchas.concat(peJobs);
};

export const mapMétier = (response: MetierLaBonneAlternanceApiResponse): Array<MetierAlternance> => {
	const resultats = response.labelsAndRomes;
	return resultats.map((metier) => ({
		label: metier.label,
		romes: metier.romes,
	}));
};

