import {
	Alternance,
	AlternanceListApiResponse
} from '../../domain/alternance'


export const mapAlternance = (response: AlternanceListApiResponse):Array<Alternance> => {
	const resultats = response.matchas.results
	return resultats.map((offre) => ({
		titre: offre.title,
		nomEntreprise: offre.company.name,
		localisation: offre.place.city,
		niveauRequis: offre.diplomaLevel,
		typeDeContrat: offre.job.contractType ?? [],
	}))

}