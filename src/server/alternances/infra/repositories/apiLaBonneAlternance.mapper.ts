import {
	Alternance,
	AlternanceContrat,
	AlternanceSource,
	ResultatRechercheAlternance,
	ResultatRechercheAlternanceEntreprise,
	ResultatRechercheAlternanceOffre,
} from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
	AlternanceApiJobsResponseLbaCompanies as LbaCompanies,
	AlternanceApiJobsResponseMatcha as Matcha,
	AlternanceApiJobsResponsePEJobs as PEJobs,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';

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
		source: AlternanceSource.MATCHA,
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
		natureDuContrat: AlternanceContrat.ALTERNANCE,
		niveauRequis: undefined,
		rythmeAlternance: alternance.job.duration,
		source: AlternanceSource.FRANCE_TRAVAIL,
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType ? [alternance.job.contractType] : [],
	};
}

function mapRésultatRechercherAlternancePEJob(alternance: PEJobs): ResultatRechercheAlternanceOffre {
	return {
		entreprise: {
			nom: alternance.company?.name,
		},
		id: alternance.job.id,
		localisation: alternance.place?.city,
		source: AlternanceSource.FRANCE_TRAVAIL,
		titre: alternance.title,
		typeDeContrat: alternance.job.contractType ? [alternance.job.contractType] : [],
	};
}

function mapRésultatRechercherAlternanceLbaEntreprise(entreprise: LbaCompanies): ResultatRechercheAlternanceEntreprise {
	const getNombreSalariés = (tailleEntreprise: string) => {
		if (tailleEntreprise === '0-0') {
			return { max: 9, min: 0 };
		}

		if (tailleEntreprise.includes('-')) {
			const [ minTailleEntreprise, maxTailleEntreprise ] = tailleEntreprise.split('-').map(Number);
			const isMinAndMaxNumberValid = minTailleEntreprise >= 0 && maxTailleEntreprise >= 0;
			return isMinAndMaxNumberValid ? { max: maxTailleEntreprise, min: minTailleEntreprise } : undefined;
		}

		const tailleEntrepriseNumber = Number(tailleEntreprise);
		const isTailleEntrepriseNumberValide = tailleEntrepriseNumber >= 0;
		return isTailleEntrepriseNumberValide ? { max: tailleEntrepriseNumber, min: tailleEntrepriseNumber } : undefined;
	};

	return {
		adresse: entreprise.place?.fullAddress,
		candidaturePossible: !!entreprise.contact?.email && !!entreprise.contact?.iv,
		id: entreprise.company?.siret,
		nom: entreprise.company.name,
		nombreSalariés: entreprise.company?.size ? getNombreSalariés(entreprise.company.size) : undefined,
		secteurs: entreprise.nafs?.map((naf) => naf.label),
	};
}

function mapRésultatRechercherAlternanceMatcha(alternance: Matcha): ResultatRechercheAlternanceOffre {
	return {
		entreprise: {
			nom: alternance.company?.name,
		},
		id: alternance.job.id,
		localisation: alternance.place?.city,
		niveauRequis: alternance.diplomaLevel,
		source: AlternanceSource.MATCHA,
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
