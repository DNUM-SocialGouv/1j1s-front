import { v4 as uuidv4 } from 'uuid';

import { Image as ImageProps } from '~/client/components/props';
import { CarteActualite } from '~/server/cms/domain/actualite';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Article } from '~/server/cms/domain/article';
import { CarteEspaceJeune, EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { Image } from '~/server/cms/domain/image';
import { CarteMesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';
import { OffreDeStage, OffreDeStageDepot, SourceDesDonnées } from '~/server/cms/domain/offreDeStage.type';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

export function mapArticle(articleResponse: Strapi.CollectionType.Article): Article {
	return {
		bannière: flatMapSingleImage(articleResponse.banniere),
		contenu: articleResponse.contenu,
		slug: articleResponse.slug,
		titre: articleResponse.titre,
	};
}

export function mapFicheMetier(response: Strapi.CollectionType.FicheMétier): FicheMétier {
	return {
		accesMetier: response.acces_metier,
		accrocheMetier: response.accroche_metier,
		centresInteret: response.centres_interet.map((centreInteret) => ({
			idOnisep: centreInteret.identifiant,
			libelle: capitalizeFirstLetter(centreInteret.libelle),
		})),
		competences: response.competences,
		conditionTravail: response.condition_travail,
		formationsMinRequise: response.formations_min_requise.map((formationMinRequise) => ({
			idOnisep: formationMinRequise.identifiant,
			libelle: capitalizeFirstLetter(formationMinRequise.libelle),
		})),
		id: response.id,
		idOnisep: response.identifiant,
		natureTravail: response.nature_travail,
		niveauAccesMin: response.niveau_acces_min.map((niveauAccesMin) => ({
			idOnisep: niveauAccesMin.identifiant,
			libelle: capitalizeFirstLetter(niveauAccesMin.libelle),
		})),
		nomMetier: response.nom_metier,
		secteursActivite: response.secteurs_activite.map((secteurActivite) => ({
			idOnisep: secteurActivite.identifiant,
			libelle: capitalizeFirstLetter(secteurActivite.libelle),
		})),
		statuts: response.statuts.map((statut) => ({
			idIdeo: statut.id_ideo1,
			idOnisep: statut.identifiant,
			libelle: capitalizeFirstLetter(statut.libelle),
		})),
		vieProfessionnelle: response.vie_professionnelle,
	};
}

function capitalizeFirstLetter(sentence: string) {
	return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}`;
}

function flatMapSingleRelation<StrapiType, ReturnType>(relation: Strapi.SingleRelation<StrapiType> | undefined, mapper: (data: NonNullable<StrapiType>) => ReturnType): ReturnType | undefined {
	if (!relation) {
		return undefined;
	}
	const strapiType = relation.data?.attributes;
	if (!strapiType) {
		return undefined;
	}
	return mapper(strapiType);
}

export function mapMesuresEmployeurs(strapiLesMesuresEmployeurs: Strapi.SingleType.LesMesuresEmployeurs): CarteMesuresEmployeurs[] {
	return strapiLesMesuresEmployeurs.dispositifs.map(mapCartesMesuresEmployeursList);
}

function mapCartesMesuresEmployeursList(strapiLesMesuresEmployeursDispositif: Strapi.SingleType.LesMesuresEmployeurs.Dispositif): CarteMesuresEmployeurs {
	const article = flatMapSingleRelation(strapiLesMesuresEmployeursDispositif.article, mapArticle);
	return {
		article,
		bannière: flatMapSingleImage(strapiLesMesuresEmployeursDispositif.banniere),
		contenu: strapiLesMesuresEmployeursDispositif.contenu,
		extraitContenu: getExtraitContenu(strapiLesMesuresEmployeursDispositif.contenu, 110),
		link: article ? `/articles/${article.slug}` : strapiLesMesuresEmployeursDispositif.url,
		pourQui: strapiLesMesuresEmployeursDispositif.pourQui,
		titre: strapiLesMesuresEmployeursDispositif.titre,
		url: strapiLesMesuresEmployeursDispositif.url,
	};
}

export function mapStrapiListeActualités(strapiListeActualités: Strapi.SingleType.ListeActualités): CarteActualite[] {
	return strapiListeActualités.listeActualites.map(mapStrapiActualité);
}

function mapStrapiActualité(strapiActualité: Strapi.SingleType.ListeActualités.Actualité): CarteActualite {
	const article = flatMapSingleRelation(strapiActualité.article, mapArticle);
	return {
		article,
		bannière: flatMapSingleImage(strapiActualité.banniere),
		contenu: strapiActualité.contenu,
		extraitContenu: getExtraitContenu(strapiActualité.contenu, 110),
		link: article ? `/articles/${article.slug}` : strapiActualité.url,
		titre: strapiActualité.titre,
	};
}

function getExtraitContenu(contenu: string, size = 120): string {
	if (contenu.length < size) return contenu;
	const end = contenu.substring(size);
	const charactersLeft = end.indexOf(' ');
	const brief = contenu.substring(0, size + charactersLeft);
	return `${brief} …`;
}

export function mapEspaceJeune(strapiMesureJeune: Strapi.SingleType.LesMesuresJeunes): EspaceJeune {
	const { vieProfessionnelle, aidesFinancieres, accompagnement, orienterFormer } = strapiMesureJeune;

	return {
		accompagnement: mapCartesEspaceJeuneList(accompagnement, 'Accompagnement'),
		aidesFinancières: mapCartesEspaceJeuneList(aidesFinancieres, 'Aides financières'),
		orienterFormer: mapCartesEspaceJeuneList(orienterFormer, 'Orientation et formation'),
		vieProfessionnelle: mapCartesEspaceJeuneList(vieProfessionnelle, 'Entrée dans la vie professionnelle'),
	};
}

function mapCartesEspaceJeuneList(cartesEspaceJeuneList: Strapi.SingleType.LesMesuresJeunes.MesureJeune[], categorie: string): CarteEspaceJeune[] {
	return cartesEspaceJeuneList.map<CarteEspaceJeune>((carteEspaceJeune) => {
		const { banniere, contenu, titre, url, pourQui } = carteEspaceJeune;
		const article = flatMapSingleRelation(carteEspaceJeune.article, mapArticle);
		return {
			article,
			bannière: flatMapSingleImage(banniere),
			categorie: categorie,
			concerné: pourQui,
			contenu,
			extraitContenu: getExtraitContenu(contenu, 110),
			link: article ? `/articles/${article.slug}` : url,
			titre,
			url,
		};
	});
}

function flatMapSingleImage(response: Strapi.SingleRelation<Strapi.Image> | undefined): Image | undefined {
	if (!response?.data) {
		return undefined;
	}
	return {
		alt: response.data.attributes.alternativeText || '',
		url: response.data.attributes.url,
	};
}

export function mapOffreStage(response: Strapi.CollectionType.OffreStage): OffreDeStage {
	return { ...response };
}

function mapAnnonceDeLogementLocalisation(localisation: Strapi.CollectionType.AnnonceLogement.Localisation): AnnonceDeLogement.Localisation {
	return {
		adresse: localisation.adresse,
		codePostal: localisation.codePostal,
		département: localisation.département,
		pays: localisation.pays,
		région: localisation.région,
		ville: localisation.ville,
	};
};

// TODO: utiliser Image en type de sortie, ImageProps est lié à un composant. Changer la propriété url de Image en src ?
function formatImageUrlList(imagesUrl: Array<{ value: string }> | undefined): Array<ImageProps> | [] {
	if (!imagesUrl) return [];
	return imagesUrl.map((url) => {
		return {
			alt: '',
			src: url.value,
		};
	});
};

function mapAnnonceDeLogementBilanÉnergétique(bilanEnergetique: Strapi.CollectionType.AnnonceLogement.BilanEnergetique): AnnonceDeLogement.BilanEnergetique {
	return {
		consommationEnergetique: bilanEnergetique.consommationEnergetique,
		emissionDeGaz: bilanEnergetique.emissionDeGaz,
	};
};

export function mapAnnonceLogement(annonceLogementResponse: Strapi.CollectionType.AnnonceLogement): AnnonceDeLogement {
	const dateDeMiseAJour = new Date(annonceLogementResponse.sourceUpdatedAt).toLocaleDateString();

	return {
		bilanEnergetique: mapAnnonceDeLogementBilanÉnergétique(annonceLogementResponse.bilanEnergetique),
		charge: annonceLogementResponse.charge,
		dateDeDisponibilité: annonceLogementResponse.dateDeDisponibilite,
		dateDeMiseAJour,
		description: annonceLogementResponse.description,
		devise: annonceLogementResponse.devise,
		garantie: annonceLogementResponse.garantie,
		imageUrlList: formatImageUrlList(annonceLogementResponse.imagesUrl),
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

export function mapEnregistrerOffreDeStage(body: OffreDeStageDepot): Strapi.CollectionType.OffreStageDepot {
	return {
		dateDeDebut: body.dateDeDebut,
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
		//Ajoute l'offre en 'draft' dans le CMS
		publishedAt: null,
		remunerationBase: body.remunerationBase ?? null,
		source: SourceDesDonnées.INTERNE,
		teletravailPossible: body.teletravailPossible ?? null,
		titre: body.titre,
		urlDeCandidature: body.urlDeCandidature,
	};
}

