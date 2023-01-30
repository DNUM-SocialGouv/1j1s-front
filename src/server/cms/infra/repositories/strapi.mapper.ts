import { Image as ImageProps } from '~/client/components/props';
import { CarteActualite } from '~/server/cms/domain/actualite';
import {
	AnnonceDeLogement,
	AnnonceDeLogementResponse,
} from '~/server/cms/domain/annonceDeLogement.type';
import { Article } from '~/server/cms/domain/article';
import { CarteEspaceJeune, EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { Image } from '~/server/cms/domain/image';
import {
	OffreDeStage,
	OffreDeStageResponse,
} from '~/server/cms/domain/offreDeStage.type';
import {
	ActualiteAttributesResponse,
	ArticleAttributesResponse,
	ArticleSimpleAttributesResponse,
	CarteActualiteResponse,
	CarteEspaceJeuneResponse,
	CarteMesuresEmployeursResponse,
	EspaceJeuneAttributesResponse,
	MesuresEmployeursAttributesResponse,
	StrapiCollectionTypeResponse,
	StrapiImage,
	StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	FicheMétier,
	FicheMetierNestedField,
	FicheMetierNestedFieldStatut } from '~/server/fiche-metier/domain/ficheMetier';
import {
	FicheMétierHttp,
	FicheMétierHttpNestedField,
	FicheMétierHttpNestedFieldStatut,
} from '~/server/fiche-metier/domain/ficheMetierHttp';

import { CarteMesuresEmployeurs, MesuresEmployeurs } from '../../domain/mesuresEmployeurs';

export function mapMentionObligatoire(response: StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>): Article {
	const { contenu, titre } = response.data.attributes;
	return {
		bannière: undefined,
		contenu,
		slug: undefined,
		titre,
	};
}

export function mapArticle(articleResponse: StrapiCollectionTypeResponse<ArticleAttributesResponse>): Article {
	const { banniere, contenu, slug, titre } = articleResponse.data[0].attributes;

	return {
		bannière: mapImage(banniere),
		contenu: contenu || '',
		slug,
		titre,
	};
}

export function mapFicheMetier(ficheMetierResponse: StrapiCollectionTypeResponse<FicheMétierHttp>): FicheMétier {
	if (!ficheMetierResponse.data[0]){
		throw createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
	}
	const ficheMetier = ficheMetierResponse.data[0].attributes;

	return {
		accesMetier: ficheMetier.acces_metier,
		accrocheMetier: ficheMetier.accroche_metier,
		centresInteret: ficheMetier.centres_interet && mapFicheMetierNestedFieldList(ficheMetier.centres_interet),
		competences: ficheMetier.competences,
		conditionTravail: ficheMetier.condition_travail,
		formationsMinRequise: ficheMetier.formations_min_requise && mapFicheMetierNestedFieldList(ficheMetier.formations_min_requise),
		id: ficheMetier.id,
		idOnisep: ficheMetier.identifiant,
		natureTravail: ficheMetier.nature_travail,
		niveauAccesMin: ficheMetier.niveau_acces_min && mapFicheMetierNestedFieldList(ficheMetier.niveau_acces_min),
		nomMetier: ficheMetier.nom_metier,
		secteursActivite: ficheMetier.secteurs_activite && mapFicheMetierNestedFieldList(ficheMetier.secteurs_activite),
		statuts: ficheMetier.statuts && mapFicheMetierNestedFieldStatutList(ficheMetier.statuts),
		vieProfessionnelle: ficheMetier.vie_professionnelle,
	};
}

function mapFicheMetierNestedFieldStatutList(nestedFieldStatutList: FicheMétierHttpNestedFieldStatut[]): FicheMetierNestedFieldStatut[] {
	return nestedFieldStatutList.map((field) => ({
		...mapFicheMetierNestedField(field),
		idIdeo: field.id_ideo1,
	}));
}

function mapFicheMetierNestedFieldList(nestedFieldList: FicheMétierHttpNestedField[]): FicheMetierNestedField[] {
	return nestedFieldList.map((field) => mapFicheMetierNestedField(field));
}

const capitalizeFirstLetter = (sentence: string) => `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}` || '';

function mapFicheMetierNestedField(nestedField: FicheMétierHttpNestedField): FicheMetierNestedField {
	return {
		id: nestedField.id,
		idOnisep: nestedField.identifiant,
		libelle: capitalizeFirstLetter(nestedField.libelle),
	};
}

export function mapArticleRelation (article: StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>): Article | undefined {
	if (!article || !article.data ) { return undefined; }
	return  article.data.attributes;
}

export function mapMesuresEmployeurs(response: StrapiSingleTypeResponse<MesuresEmployeursAttributesResponse>): MesuresEmployeurs {
	const { dispositifs } = response.data.attributes;

	return {
		dispositifs: mapCartesMesuresEmployeursList(dispositifs),
	};
}

function mapCartesMesuresEmployeursList(carteMesuresEmployeursList: CarteMesuresEmployeursResponse[]): CarteMesuresEmployeurs[] {
	return carteMesuresEmployeursList.map<CarteMesuresEmployeurs>((carteMesuresEmployeurs) => {
		const { banniere, contenu, titre, url, pourQui } = carteMesuresEmployeurs;
		const article = mapArticleRelation(carteMesuresEmployeurs.article);
		return {
			article: article ?? null,
			bannière: mapImage(banniere),
			contenu,
			extraitContenu: getExtraitContenu(contenu, 110),
			link: article ? `/articles/${article.slug}` : url,
			pourQui,
			titre,
			url,
		};
	});
}

export function mapActualites(response: StrapiSingleTypeResponse<ActualiteAttributesResponse>): CarteActualite[] {
	return mapCarteActualiteList(response.data.attributes.listeActualites);
}

function mapCarteActualiteList(cartesActualiteList: CarteActualiteResponse[]): CarteActualite[] {
	return cartesActualiteList.map((carteActualite) => {
		const { banniere, contenu, titre, url } = carteActualite;
		const article = mapArticleRelation(carteActualite.article);
		return {
			article: article ?? null,
			bannière: mapImage(banniere),
			contenu,
			extraitContenu: getExtraitContenu(contenu, 110),
			link: article ? `/articles/${article.slug}` : url,
			titre,
		};
	});
}

function getExtraitContenu(contenu: string, size = 120): string {
	if (contenu.length < size) return contenu;
	const end = contenu.substring(size);
	const charactersLeft = end.indexOf(' ');
	const brief = contenu.substring(0, size + charactersLeft);
	return `${brief} …`;
}

export function mapEspaceJeune(response: StrapiSingleTypeResponse<EspaceJeuneAttributesResponse>): EspaceJeune {
	const { vieProfessionnelle, aidesFinancieres, accompagnement, orienterFormer } = response.data.attributes;

	return {
		accompagnement: mapCartesEspaceJeuneList(accompagnement, 'Accompagnement'),
		aidesFinancières: mapCartesEspaceJeuneList(aidesFinancieres, 'Aides financières'),
		orienterFormer: mapCartesEspaceJeuneList(orienterFormer, 'Orientation et formation'),
		vieProfessionnelle: mapCartesEspaceJeuneList(vieProfessionnelle, 'Entrée dans la vie professionnelle'),
	};
}

function mapCartesEspaceJeuneList(cartesEspaceJeuneList: CarteEspaceJeuneResponse[], categorie: string): CarteEspaceJeune[] {
	return cartesEspaceJeuneList.map<CarteEspaceJeune>((carteEspaceJeune) => {
		const { banniere, contenu, titre, url, pourQui } = carteEspaceJeune;
		const article = mapArticleRelation(carteEspaceJeune.article);
		return {
			article: article ?? null,
			bannière: mapImage(banniere),
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

export function mapImage(bannière: StrapiImage | undefined): Image | undefined {
	if(bannière?.data) {
		const { alternativeText, url } = bannière.data.attributes;
		return {
			alt: alternativeText || '',
			url: url,
		};
	} else {
		return undefined;
	}
}

export function mapOffreStage(offreStageResponse: OffreDeStageResponse): OffreDeStage {
	return offreStageResponse;
}

const getLocalisation = (localisation: AnnonceDeLogementResponse.Localisation): AnnonceDeLogement.Localisation => {
	return {
		adresse: localisation.adresse,
		codePostal: localisation.codePostal,
		département: localisation.département,
		pays: localisation.pays,
		région: localisation.région,
		ville: localisation.ville,
	};
};

const formatImageUrlList = (imagesUrl: Array<{ value: string }> | undefined): Array<ImageProps> | [] => {
	if (!imagesUrl) return [];
	return imagesUrl.map((url) => {
		return {
			alt: '',
			src: url.value,
		};
	});
};

const getBilanEnergetique = (bilanEnergetique: AnnonceDeLogementResponse.BilanEnergetique): AnnonceDeLogement.BilanEnergetique => {
	return {
		consommationEnergetique: bilanEnergetique.consommationEnergetique,
		emissionDeGaz: bilanEnergetique.emissionDeGaz,
	};
};

export function mapAnnonceLogement(annonceLogementResponse: AnnonceDeLogementResponse ): AnnonceDeLogement {
	const dateDeMiseAJour = new Date(annonceLogementResponse.sourceUpdatedAt).toLocaleDateString();

	return {
		bilanEnergetique: getBilanEnergetique(annonceLogementResponse.bilanEnergetique),
		charge: annonceLogementResponse.charge,
		dateDeDisponibilité: annonceLogementResponse.dateDeDisponibilite,
		dateDeMiseAJour,
		description: annonceLogementResponse.description,
		devise: annonceLogementResponse.devise,
		garantie: annonceLogementResponse.garantie,
		imageUrlList: formatImageUrlList(annonceLogementResponse.imagesUrl),
		localisation: getLocalisation(annonceLogementResponse.localisation),
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
