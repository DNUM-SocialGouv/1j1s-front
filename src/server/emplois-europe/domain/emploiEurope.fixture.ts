import { EmploiEurope, ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { LEVEL_CODE, LEVEL_NAME } from '~/server/emplois-europe/infra/langageEures';
import { UNITE_EXPERIENCE_NECESSAIRE } from '~/server/emplois-europe/infra/uniteExperienceNecessaire';

export function aResultatRechercheEmploiEuropeList(override?: Partial<ResultatRechercheEmploiEurope>): ResultatRechercheEmploiEurope {
	return {
		nombreResultats: 2,
		offreList: [
			anEmploiEurope({
				id: '1',
				localisations: [{ pays: 'France', ville: 'Paris' }],
				nomEntreprise: 'La Boulangerie',
				titre: 'Boulanger (H/F)',
				urlCandidature: 'https://urlDeCandidature.com',
			}),
			anEmploiEurope({
				id: '2',
				localisations: [{ pays: 'France', ville: 'Paris' }],
				nomEntreprise: 'La Pâtisserie',
				titre: 'Pâtissier (H/F)',
				urlCandidature: 'https://urlDeCandidature2.com',
			}),
		],
		...override,
	};
}

//TODO enelever des undefined pour remettre des valeurs identiques dans l'objet métier / objet infra
export function anEmploiEurope(override?: Partial<EmploiEurope>): EmploiEurope {
	return {
		codeLangueDeLOffre: 'nl',
		competencesLinguistiques: [{
			codeDuNiveauDeLangue: LEVEL_CODE.A2,
			detailCompetenceLanguistique: [{
				codeDuNiveauDeLaCompetence: LEVEL_CODE.B2,
				nomCompetence: 'Interaction orale',
				nomDuNiveauDeLaCompetence: LEVEL_NAME.AVANCE,
			}],
			langage: 'français',
			nomDuNiveauDeLangue: LEVEL_NAME.INTERMEDIAIRE,
		}],
		description: '<p><strong>Fonction:</strong></p><ul><li>En tant que Co&#233;quipier cuisine, tu es un ambassadeur/une ambassadrice de la marque et tu portes nos valeurs dans ta boulangerie-restaurant.</li> <li>Tu pr&#233;pares nos plats dans ta cuisine et tu es un soutien au service en salle si n&#233;cessaire. La pr&#233;paration (mise en place) est &#233;galement sous ta responsabilit&#233;.</li> </ul>',
		id: '1',
		laPlusLongueExperienceNecessaire: {
			duree: 3,
			unite: UNITE_EXPERIENCE_NECESSAIRE.YEAR,
		},
		langueDeTravail: ['néerlandais'],
		listePermis: ['B'],
		localisations: [{ pays: 'France', 		ville: 'Paris' }],
		nomEntreprise: undefined,
		titre: undefined,
		urlCandidature: 'https://urlDeCandidature.com',
		...override,
	};
}
