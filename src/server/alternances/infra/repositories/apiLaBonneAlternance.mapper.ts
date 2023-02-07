import {
	Alternance,
	AlternanceListApiResponse,
} from '../../domain/alternance';


export const mapAlternance = (response: AlternanceListApiResponse): Array<Alternance> => {
	const resultats = response.matchas.results;
	return resultats.map((offre) => ({
		localisation: offre.place?.city,
		niveauRequis: offre.diplomaLevel,
		nomEntreprise: offre.company?.name,
		titre: offre.title,
		typeDeContrat: offre.job.contractType,
	}));

};
