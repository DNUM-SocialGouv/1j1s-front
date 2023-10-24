import { Domaines, OffreDeStage, SourceDesDonnées } from '~/server/cms/domain/offreDeStage.type';
import { anOffreDeStageResponse } from '~/server/cms/infra/repositories/strapi.fixture';
import { mapOffreStage, mapVideoCampagneApprentissage } from '~/server/cms/infra/repositories/strapi.mapper';
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

describe('mapOffreDeStage', () => {
	it('map vers une offre de stage à afficher', () => {
		const offreDeStageResponse: Strapi.CollectionType.OffreStage = {
			createdAt: '2023-01-06T07:49:10.773Z',
			dateDeDebutMax: '2024-09-01',
			dateDeDebutMin: '2024-09-01',
			description: 'Poste ouvert aux personnes en situation de handicap',
			domaines: [],
			dureeEnJour: 720,
			dureeEnJourMax: 800,
			employeur: {
				description: null,
				email: null,
				logoUrl: null,
				nom: 'La Relève',
				siteUrl: null,
			},
			id: 'anId',
			identifiantSource: '036780b7-95ba-4711-bf26-471d1f95051c',
			localisation: {
				adresse: null,
				codePostal: null,
				departement: null,
				pays: 'France',
				region: null,
				ville: null,
			},
			publishedAt: '2023-01-06T07:49:10.756Z',
			remunerationBase: 1000,
			slug: 'alternance-audit-tours-h-f-036780b7-95ba-4711-bf26-471d1f95051c',
			source: 'jobteaser' as SourceDesDonnées,
			sourceCreatedAt: '',
			sourcePublishedAt: '',
			sourceUpdatedAt: '',
			teletravailPossible: true,
			titre: 'Alternance Audit - Tours ( H/F)',
			updatedAt: '2023-01-06T07:49:10.773Z',
			urlDeCandidature: 'https://www.jobteaser.com/en/job-offers/10067252',
		};


		const result: OffreDeStage = mapOffreStage(offreDeStageResponse);
		const expectedResult: OffreDeStage = {
			dateDeDebutMax: '2024-09-01',
			dateDeDebutMin: '2024-09-01',
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
			source: SourceDesDonnées.JOBTEASER,
			teletravailPossible: true,
			titre: 'Alternance Audit - Tours ( H/F)',
			urlDeCandidature: 'https://www.jobteaser.com/en/job-offers/10067252',
		};
		expect(result).toEqual(expectedResult);
	});
	describe('pour les domaines associés au stage', () => {
		it('ne prend pas en compte le domaine "Non renseigné"', () => {
			const domainesAvecUnDomaineNonRenseigne = {
				domaines: [
					{ nom: Strapi.CollectionType.OffreStage.Domaines.Nom.ACHAT },
					{ nom: Strapi.CollectionType.OffreStage.Domaines.Nom.NON_RENSEIGNE },
				],
			};
			const result = mapOffreStage(anOffreDeStageResponse(domainesAvecUnDomaineNonRenseigne));

			expect(result.domaines).toStrictEqual([Domaines.ACHAT]);
		});
	});
});
