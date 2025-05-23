import { Alternance, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { AlternanceStatus } from '~/server/alternances/infra/status';

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
		lien: recruiter.apply.url,
		nom: recruiter.workplace.name,
		nombreSalariés: size,
		secteurs: recruiter.workplace.domain.naf?.label ? [recruiter.workplace.domain.naf?.label] : [],
	};
}

function mapSource(source: string): Alternance.Source {
	return source === 'France Travail'
		? Alternance.Source.FRANCE_TRAVAIL
		: Alternance.Source.MATCHA;
}

function mapJobResult(job: AlternanceApiJobsResponse.Job): ResultatRechercheAlternance.Offre | null {
	const source = mapSource(job.identifier.partner_label);
	if (!job.identifier.id) { return null; }

	return {
		entreprise: {
			adresse: job.workplace.location.address,
			nom: job.workplace.name,
			téléphone: job.apply.phone,
		},
		id: job.identifier.id ?? job.identifier.partner_job_id,
		localisation: job.workplace.location.address,
		niveauRequis: job.offer.target_diploma?.label,
		source,
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

export function mapDetailAlternance(response: AlternanceApiJobsResponse.Job): Alternance {
	return {
		compétences: response.offer.desired_skills,
		dateDébut: response.contract.start ? new Date(response.contract.start) : null,
		description: response.offer.description,
		descriptionEmployeur: response.workplace.description,
		durée: response.contract.duration ? `${response.contract.duration} mois` : null,
		entreprise: {
			adresse: response.workplace.location.address,
			nom: response.workplace.name,
			téléphone: response.apply.phone,
		},
		id: response.identifier.id ?? response.identifier.partner_job_id,
		lienPostuler: response.apply.url,
		localisation: response.workplace.location.address,
		niveauRequis: response.offer.target_diploma?.label,
		rythmeAlternance: null,
		source: Alternance.Source.MATCHA,
		status: response.offer.status === 'Active' ? AlternanceStatus.ACTIVE : AlternanceStatus.CANCELED,
		titre: response.offer.title,
		typeDeContrat: response.contract.type,
	};
}

function nonNull<T>(element: T | null | undefined) {
	return element != null;
}
