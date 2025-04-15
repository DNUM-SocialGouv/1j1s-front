import { Alternance, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';

import { AlternanceApiJobsResponse } from './apiAlternance';

function parseWorkplaceSize(size: string | null): {min: number, max: number} | null {
	const [match, min, hasMax, max] = size?.match(/(\d+)\s*(-\s*(\d+))?/) ?? [];
	if (!match) {
		return null;
	}

	const result = {
		max: hasMax ? Number(max) : Number(min),
		min: Number(min),
	};
	if (result.max === 0) { result.max = 9; }

	return result;
}

function mapRecruiterResult(recruiter: AlternanceApiJobsResponse.Recruiter): ResultatRechercheAlternance.Entreprise | null {
	const size = parseWorkplaceSize(recruiter.workplace.size);
	if (!recruiter.workplace.name) {
		return null;
	}
	return {
		adresse: recruiter.workplace.location.address,
		candidaturePossible: true,
		id: recruiter.identifier.id,
		nom: recruiter.workplace.name,
		nombreSalariés: size,
		secteurs: recruiter.workplace.domain.naf?.label ? [recruiter.workplace.domain.naf?.label] : [],
	};
}

function mapJobResult(job: AlternanceApiJobsResponse.Job): ResultatRechercheAlternance.Offre | null {
	const sources = ['offres_emploi_lba', 'OFFRES_EMPLOI_LBA', 'recruteurs_lba', 'RECRUTEURS_LBA', 'France Travail'];
	if (!sources.includes(job.identifier.partner_label)) {
		return null;
	}
	return {
		entreprise: {
			adresse: job.workplace.location.address,
			nom: job.workplace.name,
			téléphone: job.apply.phone,
		},
		id: job.identifier.id ?? job.identifier.partner_job_id,
		localisation: job.workplace.location.address,
		niveauRequis: job.offer.target_diploma?.label,
		source: job.identifier.partner_label === 'France Travail' ? Alternance.Source.FRANCE_TRAVAIL : Alternance.Source.MATCHA,
		titre: job.offer.title,
		typeDeContrat: job.contract.type,
	};
}

export function mapRechercheAlternanceListe(response: AlternanceApiJobsResponse): ResultatRechercheAlternance {
	return {
		entrepriseList: response.recruiters.map(mapRecruiterResult).filter(nonNull),
		offreList: response.jobs.map(mapJobResult).filter(nonNull),
	};
};

function nonNull<T>(element: T | null | undefined) {
	return element != null;
}
