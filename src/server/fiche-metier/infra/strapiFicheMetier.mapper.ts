import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { capitalizeFirstLetter } from '~/server/services/utils/capitalizeFirstLetter.util';


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


const FICHE_METIER_NOM_METIER_FIELD_NAME = 'nom_metier';

export function getNomMetier (strapiFicheMetier: Strapi.CollectionType.FicheMétier): string {
	return(strapiFicheMetier[FICHE_METIER_NOM_METIER_FIELD_NAME]);
}
