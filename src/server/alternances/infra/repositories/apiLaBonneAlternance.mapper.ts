import { Alternance, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import Matcha = AlternanceApiJobsResponse.Matcha;
import PEJobs = AlternanceApiJobsResponse.PEJobs;

function sanitizeEscapeSequences(texte?: string) {
	if (!texte) return texte;
	return JSON.parse(`"${texte}"`);
}

function parseDurée(durée: number | undefined) {
	if (!durée) return undefined;

	return `${durée} mois`;
}

function parseContractTypeMatcha(alternance: Matcha): string[] {
	if (!alternance.job.contractType) return [];
	return alternance.job.contractType.split(', ');
}

export function mapMatcha(alternance: Matcha): Alternance {
	const getTagList = () => {
		let tagList;
		if (alternance.job.contractType) {
			tagList = [alternance.place?.city, ...parseContractTypeMatcha(alternance), alternance.diplomaLevel];
		} else {
			tagList = [alternance.place?.city, alternance.diplomaLevel];
		}
		return tagList.filter((tag) => !!tag) as string[];
	};
	return {
		compétences: alternance.job.romeDetails?.competencesDeBase?.map((compétence) => compétence.libelle),
		dateDébut: alternance.job.jobStartDate != null ? new Date(alternance.job.jobStartDate) : undefined,
		description: sanitizeEscapeSequences(alternance.job.romeDetails?.definition),
		durée: parseDurée(alternance.job.dureeContrat),
		entreprise: {
			adresse: alternance.place?.fullAddress,
			nom: alternance.company?.name,
			téléphone: alternance.contact?.phone,
		},
		id: alternance.job.id,
		lienPostuler: alternance.job.id ? `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}postuler?caller=1jeune1solution&itemId=${alternance.job.id}&type=matcha` : undefined,
		localisation: alternance.place?.city,
		niveauRequis: alternance.diplomaLevel,
		rythmeAlternance: alternance.job.rythmeAlternance,
		source: Alternance.Source.MATCHA,
		tags: getTagList(),
		titre: alternance.title,
		typeDeContrat: parseContractTypeMatcha(alternance),
	};
}

export function mapPEJob(alternance: PEJobs): Alternance {
	return {
		description: alternance.job.description,
		durée: alternance.job.contractDescription,
		entreprise: {
			adresse: alternance.place?.fullAddress,
			nom: alternance.company?.name,
			téléphone: alternance.contact?.phone,
		},
		id: alternance.job.id,
		lienPostuler: alternance.url,
		localisation: alternance.place?.city,
		natureDuContrat: Alternance.Contrat.ALTERNANCE,
		niveauRequis: undefined,
		rythmeAlternance: alternance.job.duration,
		source: Alternance.Source.POLE_EMPLOI,
		tags: [alternance.place?.city, Alternance.Contrat.ALTERNANCE, alternance.job.contractType].filter((tag) => !!tag) as string[],
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType ? [alternance.job.contractType] : [],
	};
}

function mapRésultatRechercherAlternancePEJob(alternance: PEJobs): RésultatRechercheAlternance {
	return {
		entreprise: {
			nom: alternance.company?.name,
		},
		id: alternance.job.id,
		source: Alternance.Source.POLE_EMPLOI,
		tags: [alternance.place?.city, Alternance.Contrat.ALTERNANCE, alternance.job.contractType].filter((tag) => !!tag) as string[],
		titre: alternance.title,
	};
}

function mapRésultatRechercherAlternanceMatcha(alternance: Matcha): RésultatRechercheAlternance {
	const getTagList = () => {
		let tagList;
		if (alternance.job.contractType) {
			tagList = [alternance.place?.city, ...parseContractTypeMatcha(alternance), alternance.diplomaLevel];
		} else {
			tagList = [alternance.place?.city, alternance.diplomaLevel];
		}
		return tagList.filter((tag) => !!tag) as string[];
	};
	return {
		entreprise: {
			nom: alternance.company?.name,
		},
		id: alternance.job.id,
		source: Alternance.Source.MATCHA,
		tags: getTagList(),
		titre: alternance.title,
	};
}

export const mapAlternanceListe = (response: AlternanceApiJobsResponse): Array<RésultatRechercheAlternance> => {
	const matchas = response.matchas.results.map(mapRésultatRechercherAlternanceMatcha);
	const peJobs = response.peJobs.results.map(mapRésultatRechercherAlternancePEJob);
	return matchas.concat(peJobs);
};
