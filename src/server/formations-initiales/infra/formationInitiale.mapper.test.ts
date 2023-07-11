/**
 * @jest-environment jsdom
 */

import {
	aFormationInitialeDetail, aResultatFormationInitiale,
} from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	formationInitialeDetailMapper,
	formationInitialeRechercheMapper,
} from '~/server/formations-initiales/infra/formationInitiale.mapper';
import {
	aFormationInitialeApiResponse, aResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/formationInitialeResponse.fixture';

describe('formationInitialeRechercheMapper', () => {
	it('l‘identifiant ne peut pas être récupéré', () => {
		const formationsInitialesMapped = formationInitialeRechercheMapper(aResultatRechercheFormationInitialeApiResponse({
			results: [aFormationInitialeApiResponse({
				url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/pasUnSlug/FOR.3311',
			})],
		}));

		expect(formationsInitialesMapped.formationsInitiales[0].identifiant).toEqual(undefined);
	});

	it('l‘identifiant est récupéré', () => {
		const formationsInitialesMapped = formationInitialeRechercheMapper(aResultatRechercheFormationInitialeApiResponse({
			results: [aFormationInitialeApiResponse({
				url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.3311',
			})],
		}));

		expect(formationsInitialesMapped.formationsInitiales[0].identifiant).toEqual('FOR.3311');
	});

	it('map les formations initiales', () => {
		const apiResponse = aResultatRechercheFormationInitialeApiResponse();
		const formationInitialeMapped = formationInitialeRechercheMapper(apiResponse);
		expect(formationInitialeMapped).toEqual(aResultatFormationInitiale());
	});

	describe('map la certification', () => {
		it('lorsque le niveau de certification est 0, je renvoie une string vide', () => {
			const formationInitialeApiResponse = aFormationInitialeApiResponse({ niveau_de_certification: '0' });
			const apiResponse = aResultatRechercheFormationInitialeApiResponse({ results: [formationInitialeApiResponse] });
			const formationInitialeMapped = formationInitialeRechercheMapper(apiResponse);
			expect(formationInitialeMapped.formationsInitiales[0].tags).toEqual([formationInitialeApiResponse.niveau_de_sortie_indicatif, formationInitialeApiResponse.duree]);
		});

		it('lorsque le niveau de certification est une string vide, je renvoie une string vide', () => {
			const formationInitialeApiResponse = aFormationInitialeApiResponse({ niveau_de_certification: '' });
			const apiResponse = aResultatRechercheFormationInitialeApiResponse({ results: [formationInitialeApiResponse] });
			const formationInitialeMapped = formationInitialeRechercheMapper(apiResponse);
			expect(formationInitialeMapped.formationsInitiales[0].tags).toEqual([formationInitialeApiResponse.niveau_de_sortie_indicatif, formationInitialeApiResponse.duree]);
		});

		it('lorsque le niveau de certification est fourni, je renvoie l‘information attendue', () => {
			const formationInitialeApiResponse = aFormationInitialeApiResponse({ niveau_de_certification: 'niveau 5 (bac + 2)' });
			const formationInitialeListApiResponse = aResultatRechercheFormationInitialeApiResponse({ results: [formationInitialeApiResponse] });
			const formationInitialeMapped = formationInitialeRechercheMapper(formationInitialeListApiResponse);
			expect(formationInitialeMapped.formationsInitiales[0].tags).toEqual(['Certifiante', formationInitialeApiResponse.niveau_de_sortie_indicatif, formationInitialeApiResponse.duree]);
		});
	});
});

describe('formationInitialeDetailMapper', () => {
	it('map une formation initiale pour afficher le détail', () => {
		const formationInitialeResultExpected = aFormationInitialeDetail({
			libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
			tags: ['Certifiante', 'Bac + 2', '1 an'],
		});

		const formationInitialeMapped = formationInitialeDetailMapper(aFormationInitialeApiResponse({
			duree: '1 an',
			libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
			niveau_de_certification: '3',
			niveau_de_sortie_indicatif: 'Bac + 2',
		}));

		expect(formationInitialeMapped).toEqual(formationInitialeResultExpected);
	});

	describe('affiche les tags', () => {
		it('lorsque le niveau de certification est 0, la formation n‘est pas certifiante', () => {
			const formationInitialeResultExpected = aFormationInitialeDetail({
				libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
				tags: ['Bac + 2', '1 an'],
			});

			const formationInitialeMapped = formationInitialeDetailMapper(aFormationInitialeApiResponse({
				duree: '1 an',
				libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
				niveau_de_certification: '0',
				niveau_de_sortie_indicatif: 'Bac + 2',
			}));

			expect(formationInitialeMapped).toEqual(formationInitialeResultExpected);
		});

		it('lorsque le niveau de certification est vide, la formation n‘est pas certifiante', () => {
			const formationInitialeResultExpected = aFormationInitialeDetail({
				libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
				tags: ['Bac + 2', '1 an'],
			});

			const formationInitialeMapped = formationInitialeDetailMapper(aFormationInitialeApiResponse({
				duree: '1 an',
				libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
				niveau_de_certification: '',
				niveau_de_sortie_indicatif: 'Bac + 2',
			}));

			expect(formationInitialeMapped).toEqual(formationInitialeResultExpected);
		});

		it('lorsque le niveau de certification est valide, la formation est certifiante', () => {
			const formationInitialeResultExpected = aFormationInitialeDetail({
				libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
				tags: ['Certifiante', 'Bac + 2', '1 an'],
			});

			const formationInitialeMapped = formationInitialeDetailMapper(aFormationInitialeApiResponse({
				duree: '1 an',
				libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
				niveau_de_certification: '3',
				niveau_de_sortie_indicatif: 'Bac + 2',
			}));

			expect(formationInitialeMapped).toEqual(formationInitialeResultExpected);
		});
	});
});
