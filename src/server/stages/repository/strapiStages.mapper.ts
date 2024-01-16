import { v4 as uuidv4 } from 'uuid';

import { OffreDeStage, OffreStageDepot } from '~/server/stages/domain/stages';
import { SourceDesDonnées } from '~/server/stages/repository/sourceDesDonnéesStage';
import { OffreStageDepotStrapi, OffreStageResponseStrapi } from '~/server/stages/repository/strapiStages';

export function mapOffreStage(response: OffreStageResponseStrapi.OffreStage): OffreDeStage {
	return {
		dateDeDebutMax: response.dateDeDebutMax,
		dateDeDebutMin: response.dateDeDebutMin,
		description: response.description,
		domaines: response.domaines?.map((domaine) => domaine.nom) || [],
		dureeEnJour: response.dureeEnJour ?? undefined,
		dureeEnJourMax: response.dureeEnJourMax ?? undefined,
		employeur: response.employeur ? {
			description: response.employeur.description || undefined,
			logoUrl: response.employeur.logoUrl || undefined,
			nom: response.employeur.nom,
			siteUrl: response.employeur.siteUrl || undefined,
		} : undefined,
		id: response.id,
		localisation: response.localisation ? {
			codePostal: response.localisation.codePostal || undefined,
			departement: response.localisation.departement || undefined,
			pays: response.localisation.pays || undefined,
			region: response.localisation.region || undefined,
			ville: response.localisation.ville || undefined,
		} : undefined,
		remunerationBase: response.remunerationBase ?? undefined,
		slug: response.slug,
		source: response.source || undefined,
		teletravailPossible: response.teletravailPossible ?? undefined,
		titre: response.titre,
		urlDeCandidature: response.urlDeCandidature || undefined,
	};
}

export function mapToStrapiDepotOffreDeStage(body: OffreStageDepot.OffreDeStageDepot): OffreStageDepotStrapi {
	return {
		dateDeDebutMax: body.dateDeDebutMax,
		dateDeDebutMin: body.dateDeDebutMin,
		description: body.description,
		domaines: body.domaine ? [{
			nom: body.domaine,
		}] : [],
		dureeEnJour: Number(body.duree),
		employeur: {
			description: body.employeur.description,
			email: body.employeur.email,
			logoUrl: body.employeur.logoUrl || null,
			nom: body.employeur.nom,
			siteUrl: body.employeur.siteUrl || null,
		},
		identifiantSource: uuidv4(),
		localisation: {
			adresse: body.localisation.adresse,
			codePostal: body.localisation.codePostal,
			departement: body.localisation.departement || null,
			pays: body.localisation.pays,
			region: body.localisation.region || null,
			ville: body.localisation.ville,
		},
		// NOTE (BRUJ 02/01/2024): 'publishedAt' à null rajoute l'offre en draft dans le cms
		publishedAt: null,
		remunerationBase: body.remunerationBase ?? null,
		source: SourceDesDonnées.INTERNE,
		teletravailPossible: body.teletravailPossible ?? null,
		titre: body.titre,
		urlDeCandidature: body.urlDeCandidature,
	};
}
