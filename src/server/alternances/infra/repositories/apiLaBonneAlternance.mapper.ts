import {
	Alternance,
	AlternanceListApiResponse,
} from '~/server/alternances/domain/alternance';


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
