import { Image } from '~/server/cms/domain/image';

import { AnnonceDeLogement } from '../domain/annonceDeLogement';
import { Localisation, StrapiAnnonceDeLogement } from './strapiAnnonceDeLogement';

function mapAnnonceDeLogementLocalisation(localisation: Localisation): Localisation {
	return {
		adresse: localisation.adresse,
		codePostal: localisation.codePostal,
		département: localisation.département,
		pays: localisation.pays,
		région: localisation.région,
		ville: localisation.ville,
	};
} // map rien du tout, à supprimer ? Puis déplacer la déclaration de type de Localisation et Energie etc dans domaine ?

function mapImage(imageUrl: { value: string }): Image {
	return {
		alt: '',
		src: imageUrl.value,
	};
}

export function mapAnnonceLogement(annonceLogementResponse: StrapiAnnonceDeLogement): AnnonceDeLogement {
	const dateDeMiseAJour = new Date(annonceLogementResponse.sourceUpdatedAt).toLocaleDateString();

	return {
		bilanEnergetique: annonceLogementResponse.bilanEnergetique,
		charge: annonceLogementResponse.charge,
		dateDeDisponibilité: annonceLogementResponse.dateDeDisponibilite,
		dateDeMiseAJour,
		description: annonceLogementResponse.description,
		devise: annonceLogementResponse.devise,
		garantie: annonceLogementResponse.garantie,
		imageList: annonceLogementResponse.imagesUrl?.map(mapImage) || [],
		localisation: mapAnnonceDeLogementLocalisation(annonceLogementResponse.localisation),
		meublé: annonceLogementResponse.meuble,
		nombreDePièces: annonceLogementResponse.nombreDePieces,
		prix: annonceLogementResponse.prix,
		prixHT: annonceLogementResponse.prixHT,
		servicesInclus: annonceLogementResponse.servicesInclus.map((service) => service.nom),
		servicesOptionnels: annonceLogementResponse.servicesOptionnels.map((service) => service.nom),
		source: annonceLogementResponse.source,
		surface: annonceLogementResponse.surface,
		surfaceMax: annonceLogementResponse.surfaceMax,
		titre: annonceLogementResponse.titre,
		type: annonceLogementResponse.type,
		typeBien: annonceLogementResponse.typeBien,
		urlDeCandidature: annonceLogementResponse.url,
		étage: annonceLogementResponse.etage,
	};
}
