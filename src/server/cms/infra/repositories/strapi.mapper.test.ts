import {
	anOffreDeStageResponse,
} from '~/server/cms/infra/repositories/strapi.fixture';
import {
	mapOffreStage,
	mapVideoCampagneApprentissage,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

describe('mapVideoCampagneApprentissage', () => {
	describe('quand l’url de la vidéo n’a pas de query params', () => {
		const url = 'https://www.youtube.com/watch?v=V3cxW3ZRV-I';

		it('map les données de la vidéo de campagne d’apprentissage', () => {
			const input: Strapi.CollectionType.VideoCampagneApprentissage = {
				Titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
				Transcription: '[transcription]',
				Url: url,
			};

			const result = mapVideoCampagneApprentissage(input);

			expect(result).toEqual({
				titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
				transcription: '[transcription]',
				videoId: 'V3cxW3ZRV-I',
			});
		});
	});

	describe('quand l’url de la vidéo a des query params', () => {
		const url = 'https://www.youtube.com/watch?v=F_oOtaxb0L8&t=1059';

		it('map les données de la vidéo de campagne d’apprentissage', () => {
			const input: Strapi.CollectionType.VideoCampagneApprentissage = {
				Titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
				Transcription: '[transcription]',
				Url: url,
			};

			const result = mapVideoCampagneApprentissage(input);

			expect(result).toEqual({
				titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
				transcription: '[transcription]',
				videoId: 'F_oOtaxb0L8',
			});
		});
	});
});


// TODO (BRUJ 14-06-2023): à changer après la mise en place du nouveau modèle de données
describe('mapOffreDeStage', () => {
	it('lorsque la dateDeDebutMin n‘est pas fournie mais que la dateDeDebut l‘est, renvoie la dateDeDebut', () => {
		const result = mapOffreStage(anOffreDeStageResponse({ dateDeDebutMin: undefined }));
		const expectedResult = {
			dateDeDebut: '2024-09-01',
			description: 'Poste ouvert aux personnes en situation de handicap',
			domaines: [],
			dureeEnJour: 720,
			dureeEnJourMax: 800,
			employeur: {
				nom: 'La Relève',
			},
			id: 'anId',
			localisation: {
				pays: 'France',
			},
			remunerationBase: 1000,
			slug: 'alternance-audit-tours-h-f-036780b7-95ba-4711-bf26-471d1f95051c',
			source: 'jobteaser',
			teletravailPossible: true,
			titre: 'Alternance Audit - Tours ( H/F)',
			urlDeCandidature: 'https://www.jobteaser.com/en/job-offers/10067252',
		};
		expect(result).toEqual(expectedResult);
	});
	it('lorsque la dateDeDebut n‘est pas fournie mais que la dateDeDebutMin l‘est, renvoie la dateDeDebutMin', () => {
		const result = mapOffreStage(anOffreDeStageResponse({ dateDeDebut: undefined }));
		const expectedResult = {
			dateDeDebut: '2024-09-01',
			description: 'Poste ouvert aux personnes en situation de handicap',
			domaines: [],
			dureeEnJour: 720,
			dureeEnJourMax: 800,
			employeur: {
				nom: 'La Relève',
			},
			id: 'anId',
			localisation: {
				pays: 'France',
			},
			remunerationBase: 1000,
			slug: 'alternance-audit-tours-h-f-036780b7-95ba-4711-bf26-471d1f95051c',
			source: 'jobteaser',
			teletravailPossible: true,
			titre: 'Alternance Audit - Tours ( H/F)',
			urlDeCandidature: 'https://www.jobteaser.com/en/job-offers/10067252',
		};
		expect(result).toEqual(expectedResult);
	});
});
