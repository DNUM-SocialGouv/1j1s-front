import { Domaines, OffreDeStage, SourceDesDonnées } from '~/server/stages/domain/stages';
import { anOffreDeStage } from '~/server/stages/domain/stages.fixture';
import { OffreStageResponseStrapi } from '~/server/stages/repository/strapiStages';
import { anOffreDeStageResponse } from '~/server/stages/repository/strapiStages.fixture';
import { mapOffreStage } from '~/server/stages/repository/strapiStages.mapper';

describe('mapOffreDeStage', () => {
	it('map vers une offre de stage à afficher', () => {
		const offreDeStageResponse: OffreStageResponseStrapi.OffreStage = anOffreDeStageResponse({
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
		});


		const result: OffreDeStage = mapOffreStage(offreDeStageResponse);
		const expectedResult: OffreDeStage = anOffreDeStage({
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
		});
		expect(result).toEqual(expectedResult);
	});
	describe('pour les domaines associés au stage', () => {
		it('ne prend pas en compte le domaine "Non renseigné"', () => {
			const domainesAvecUnDomaineNonRenseigne = {
				domaines: [
					{ nom: OffreStageResponseStrapi.Domaines.Nom.ACHAT },
					{ nom: OffreStageResponseStrapi.Domaines.Nom.NON_RENSEIGNE },
				],
			};
			const result = mapOffreStage(anOffreDeStageResponse(domainesAvecUnDomaineNonRenseigne));

			expect(result.domaines).toStrictEqual([Domaines.ACHAT]);
		});
	});
});
