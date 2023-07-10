/**
 * @jest-environment jsdom
 */

import { aFormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale.fixture';
import { formationInitialeDetailMapper } from '~/server/formations-initiales/infra/formationInitiale.mapper';
import {
	aFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/formationInitialeResponse.fixture';

describe('formationInitialeDetailMapper', () => {
	it('map une formation initiale pour afficher le détail', () => {
		const formationInitialeResultExpected = aFormationInitialeDetail({
			libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
			tags: ['1 an', 'Bac + 2', 'Certifiante'],
		});

		const formationInitialeMapped = formationInitialeDetailMapper(aFormationInitialeApiResponse({
			duree: '1 an',
			libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
			niveau_de_certification: '3',
			niveau_de_sortie_indicatif: 'Bac + 2',
		}));

		expect(formationInitialeMapped).toEqual(formationInitialeResultExpected);
	});
	
	it('lorsque le niveau de certification est 0, la formation n‘est pas certifiante', () => {
		const formationInitialeResultExpected = aFormationInitialeDetail({
			libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
			tags: ['1 an', 'Bac + 2'],
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
			tags: ['1 an', 'Bac + 2'],
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
			tags: ['1 an', 'Bac + 2', 'Certifiante'],
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
