import {
	Alternance,
	ResultatRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { AlternanceApiJobsResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import Matcha = AlternanceApiJobsResponse.Matcha;
import PEJobs = AlternanceApiJobsResponse.PEJobs;
import LbaCompanies = AlternanceApiJobsResponse.LbaCompanies;

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

function isMatchaPass(alternance: Matcha): boolean {
	return alternance.job.employeurDescription !== null && alternance.job.employeurDescription !== undefined;
}

function mapCommonMatchaFields(alternance: Matcha): Alternance {
	return {
		dateDébut: alternance.job.jobStartDate != null ? new Date(alternance.job.jobStartDate) : undefined,
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
		status: alternance.job.status,
		titre: alternance.title,
		typeDeContrat: parseContractTypeMatcha(alternance),
	};
}

export function mapDetailMatcha(alternance: Matcha): Alternance {
	if (isMatchaPass(alternance)) {
		return {
			...mapCommonMatchaFields(alternance),
			description: alternance.job.description,
			descriptionEmployeur: alternance.job.employeurDescription,
		};
	}

	return {
		...mapCommonMatchaFields(alternance),
		compétences: alternance.job.romeDetails?.competencesDeBase?.map((compétence) => compétence.libelle),
		description: sanitizeEscapeSequences(alternance.job.romeDetails?.definition),
	};
}

export function mapDetailPEJob(alternance: PEJobs): Alternance {
	return {
		description: alternance.job.description,
		durée: alternance.job.contractDescription,
		entreprise: {
			adresse: alternance.place?.fullAddress,
			nom: alternance.company?.name,
			téléphone: undefined,
		},
		id: alternance.job.id,
		lienPostuler: alternance.url,
		localisation: alternance.place?.city,
		natureDuContrat: Alternance.Contrat.ALTERNANCE,
		niveauRequis: undefined,
		rythmeAlternance: alternance.job.duration,
		source: Alternance.Source.FRANCE_TRAVAIL,
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType ? [alternance.job.contractType] : [],
	};
}

function mapRésultatRechercherAlternancePEJob(alternance: PEJobs): ResultatRechercheAlternance.Offre {
	return {
		entreprise: {
			nom: alternance.company?.name,
		},
		id: alternance.job.id,
		localisation: alternance.place?.city,
		source: Alternance.Source.FRANCE_TRAVAIL,
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType ? [alternance.job.contractType] : [],
	};
}

function mapRésultatRechercherAlternanceLbaEntreprise(entreprise: LbaCompanies): ResultatRechercheAlternance.Entreprise {
	const getNombreSalariés = (tailleEntreprise: string) => {
		if (tailleEntreprise === '0-0') {
			return '0 à 9 salariés';
		}
		if (tailleEntreprise.includes('-'))
			return `${tailleEntreprise.replace('-', ' à ')} salariés`;
		return `${tailleEntreprise} salariés`;
	};

	return {
		adresse: entreprise.place?.fullAddress,
		candidaturePossible: !!entreprise.contact?.email && !!entreprise.contact?.iv,
		id: entreprise.company?.siret,
		nom: entreprise.company.name,
		nombreSalariés: entreprise.company?.size && getNombreSalariés(entreprise.company.size),
		secteurs: entreprise.nafs?.map((naf) => naf.label),
		ville: entreprise.place?.city,
	};
}

function mapRésultatRechercherAlternanceMatcha(alternance: Matcha): ResultatRechercheAlternance.Offre {
	return {
		entreprise: {
			nom: alternance.company?.name,
		},
		id: alternance.job.id,
		localisation: alternance.place?.city,
		niveauRequis: alternance.diplomaLevel,
		source: Alternance.Source.MATCHA,
		titre: alternance.title,
		typeDeContrat: parseContractTypeMatcha(alternance),
	};
}

function isLbaCompaniesEmpty(lbaCompanies: AlternanceApiJobsResponse['lbaCompanies']): lbaCompanies is [] {
	return Array.isArray(lbaCompanies);
}

function mapLbaCompanies(lbaCompanies: AlternanceApiJobsResponse['lbaCompanies']) {
	if (isLbaCompaniesEmpty(lbaCompanies)) {
		return [];
	}
	return lbaCompanies.results.map(mapRésultatRechercherAlternanceLbaEntreprise);
}

export const mapRechercheAlternanceListe = (response: AlternanceApiJobsResponse): ResultatRechercheAlternance => {
	const matchas = response.matchas?.results?.map(mapRésultatRechercherAlternanceMatcha) ?? [];
	const peJobs = response.peJobs?.results?.map(mapRésultatRechercherAlternancePEJob) ?? [];
	const lbaCompanies = mapLbaCompanies(response.lbaCompanies);
	return {
		entrepriseList: lbaCompanies,
		offreList: matchas.concat(peJobs),
	};
};
