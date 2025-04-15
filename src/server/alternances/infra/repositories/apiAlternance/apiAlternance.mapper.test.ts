import { Alternance } from '~/server/alternances/domain/alternance';
import { aRechercheAlternance } from '~/server/alternances/domain/alternance.fixture';

import {
	aContractResponse,
	aDomainResponse,
	aJobResponse,
	aLocationResponse,
	anAlternanceApiRechercheResponse,
	anOfferResponse,
	aRecruiterResponse,
	aWorkplaceResponse,
} from './apiAlternance.fixture';
import { mapRechercheAlternanceListe } from './apiAlternance.mapper';
import Source = Alternance.Source;

describe('mapRechercheAlternance', () => {
	it('converti une response en liste d’alternance et d‘entreprises', () => {
		const input = anAlternanceApiRechercheResponse({
			jobs: [aJobResponse({
				contract: aContractResponse({
					type: [ 'CDD', 'CDI' ],
				}),
				identifier: {
					id: 'id',
					partner_job_id: 'id',
					partner_label: 'France Travail',
				},
				offer: anOfferResponse({
					target_diploma: {
						european: '3',
						label: 'CAP, BEP',
					},
					title: 'Monteur / Monteuse en chauffage (H/F)',
				}),
				workplace: aWorkplaceResponse({
					location: aLocationResponse({
						address: 'Paris',
					}),
					name: 'ECOLE DE TRAVAIL ORT',
				}),
			})],
			recruiters: [{
				apply: {
					phone: '+33 1 99 00 00 00',
					url: 'https://api-apprentissage.beta.gouv.fr/recherche-apprentissage?display=list&page=fiche&type=matcha&itemId=664752a2ebe24062b758c641',
				},
				identifier: {
					id: 'id',
				},
				workplace: aWorkplaceResponse({
					domain: aDomainResponse({
						naf: {
							code: '8411Z',
							label: 'Développement informatique',
						},
					}),
					location: aLocationResponse({
						address: '18 RUE EMILE LANDRIN, 75020 Paris',
					}),
					name: 'CLUB VET',
					siret: '52352551700026',
					size: '0-0',
				}),
			}],
		});

		const result = mapRechercheAlternanceListe(input);

		expect(result).toEqual(aRechercheAlternance({
			entrepriseList: [{
				adresse: '18 RUE EMILE LANDRIN, 75020 Paris',
				candidaturePossible: true,
				id: 'id',
				nom: 'CLUB VET',
				nombreSalariés: { max: 9, min: 0 },
				secteurs: ['Développement informatique'],
			}],
			offreList: [
				{
					entreprise: {
						adresse: 'Paris',
						nom: 'ECOLE DE TRAVAIL ORT',
						téléphone: '+33 1 99 00 00 00',
					},
					id: 'id',
					localisation: 'Paris',
					niveauRequis: 'CAP, BEP',
					source: Source.FRANCE_TRAVAIL,
					titre: 'Monteur / Monteuse en chauffage (H/F)',
					typeDeContrat: ['CDD', 'CDI'],
				},
			],
		}));
	});

	describe('Entreprise', () => {
		describe('Converti la taille d’une entreprise', () => {
			it.each([
				[null, null],
				['pas-un-nombre', null],
				['0-0', { max: 9, min: 0 }],
				['0', { max: 9, min: 0 }],
				['6-12', { max: 12, min: 6 }],
				['15', { max: 15, min: 15 }],
				[' 6 - 12 ', { max: 12, min: 6 }],
			])('pour une taille donnée %j, renvoie une taille %j', (sizeString, expectedSize) => {
				const input = anAlternanceApiRechercheResponse({
					recruiters: [ aRecruiterResponse({
						workplace: aWorkplaceResponse({ size: sizeString }),
					}) ],
				});
				const resultEntreprise = mapRechercheAlternanceListe(input).entrepriseList;

				expect(resultEntreprise[0].nombreSalariés).toEqual(expectedSize);
			});
		});

		describe('lorsqu‘il n‘y a pas d‘entreprise', () => {
			it('retourne une liste vide', () => {
				const input = anAlternanceApiRechercheResponse({
					recruiters: [],
				});

				const result = mapRechercheAlternanceListe(input);

				expect(result).toEqual({
					entrepriseList: [],
					offreList: expect.anything(),
				});
			});
		});
	});

	describe('lorsqu‘il n‘y a pas résultat pour les jobs', () => {
		it('retourne une liste vide', () => {
			const input = anAlternanceApiRechercheResponse({
				jobs: [],
			});

			const result = mapRechercheAlternanceListe(input);

			expect(result).toEqual({
				entrepriseList: expect.anything(),
				offreList: [],
			});
		});
	});
});
