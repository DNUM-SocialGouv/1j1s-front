import {
	Alternance,
} from '~/server/alternances/domain/alternance';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import {
	AlternanceListApiResponse,
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';


export const mapAlternance = (response: AlternanceListApiResponse): Array<Alternance> => {
	const resultats = response.matchas.results;
	return resultats.map((alternance) => ({
		localisation: alternance.place?.city,
		niveauRequis: alternance.diplomaLevel,
		nomEntreprise: alternance.company?.name,
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType,
	}));
};

export const mapMétier = (response: MetierLaBonneAlternanceApiResponse): Array<MetierAlternance> => {
	const resultats = response.labelsAndRomes;
	return resultats.map((metier) => ({
		label: metier.label,
		romes: metier.romes,
	}));
};

