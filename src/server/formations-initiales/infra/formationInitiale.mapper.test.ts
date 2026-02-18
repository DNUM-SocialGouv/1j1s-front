import { aResultatFormationInitiale } from '~/client/services/formationInitiale/formationInitiale.service.fixture';
import { FormationInitialeDetailCMS } from '~/server/formations-initiales/domain/formationInitiale';
import {
	aFormationInitiale,
	aFormationInitialeDetailCMS,
} from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	mapFormationInitialeDetailFromOnisep,
	mapFormationInitialeDetailFromStrapi,
	mapRechercheformationInitiale,
} from '~/server/formations-initiales/infra/formationInitiale.mapper';
import {
	aFormationInitialeApiResponse,
	aResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.fixture';
import {
	aStrapiFormationInitialeDetail,
} from '~/server/formations-initiales/infra/strapiFormationIntialeDetail.fixture';

describe('mapRechercheformationInitiale', () => {
	it('l‘identifiant ne peut pas être récupéré', () => {
		const formationsInitialesMapped = mapRechercheformationInitiale(aResultatRechercheFormationInitialeApiResponse({
			results: [aFormationInitialeApiResponse({
				url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/pasUnSlug/FOR.3311',
			})],
		}));

		expect(formationsInitialesMapped.formationsInitiales[0].identifiant).toEqual(undefined);
	});

	it('l‘identifiant est récupéré', () => {
		const formationsInitialesMapped = mapRechercheformationInitiale(aResultatRechercheFormationInitialeApiResponse({
			results: [aFormationInitialeApiResponse({
				url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.3311',
			})],
		}));

		expect(formationsInitialesMapped.formationsInitiales[0].identifiant).toEqual('FOR.3311');
	});

	it('map les formations initiales', () => {
		const apiResponse = aResultatRechercheFormationInitialeApiResponse({
			results: [aFormationInitialeApiResponse({
				duree: '1 an',
				libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
				niveau_de_certification: '3',
				niveau_de_sortie_indicatif: 'Bac + 2',
				url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
			})],
			total: 150,
		});

		const formationInitialeAttendue = aResultatFormationInitiale({
			formationsInitiales: [
				aFormationInitiale({
					duree: '1 an',
					identifiant: 'FOR.1234',
					isCertifiante: true,
					libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
					niveauDeSortie: 'Bac + 2',
					url_formation: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
				}),
			],
			nombreDeResultat: 150,
		});

		expect(mapRechercheformationInitiale(apiResponse)).toEqual(formationInitialeAttendue);
	});

	describe('formation certifiante', () => {
		it('lorsque le niveau de certification est 0, la formation n‘est pas certifiante', () => {
			const formationInitialeApiResponse = aFormationInitialeApiResponse({ niveau_de_certification: '0' });
			const apiResponse = aResultatRechercheFormationInitialeApiResponse({ results: [formationInitialeApiResponse] });
			const formationInitialeMapped = mapRechercheformationInitiale(apiResponse);
			expect(formationInitialeMapped.formationsInitiales[0].isCertifiante).toBe(false);
		});

		it('lorsque le niveau de certification est une string vide, la formation n‘est pas certifiante', () => {
			const formationInitialeApiResponse = aFormationInitialeApiResponse({ niveau_de_certification: '' });
			const apiResponse = aResultatRechercheFormationInitialeApiResponse({ results: [formationInitialeApiResponse] });
			const formationInitialeMapped = mapRechercheformationInitiale(apiResponse);
			expect(formationInitialeMapped.formationsInitiales[0].isCertifiante).toBe(false);
		});

		it('lorsque le niveau de certification est fourni, la formation est certifiante', () => {
			const formationInitialeApiResponse = aFormationInitialeApiResponse({ niveau_de_certification: 'niveau 5 (bac + 2)' });
			const formationInitialeListApiResponse = aResultatRechercheFormationInitialeApiResponse({ results: [formationInitialeApiResponse] });
			const formationInitialeMapped = mapRechercheformationInitiale(formationInitialeListApiResponse);
			expect(formationInitialeMapped.formationsInitiales[0].isCertifiante).toBe(true);
		});
	});
});

describe('mapFormationInitialeDetailFromOnisep', () => {
	it('map une formation initiale pour afficher le détail', () => {
		const formationInitialeResultExpected = aFormationInitiale({
			identifiant: 'FOR.1234',
			isCertifiante: true,
			libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
			niveauDeSortie: 'Bac + 2',
			url_formation: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
		});

		const formationInitialeMapped = mapFormationInitialeDetailFromOnisep(aFormationInitialeApiResponse({
			duree: '1 an',
			libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
			niveau_de_certification: '3',
			niveau_de_sortie_indicatif: 'Bac + 2',
			url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
		}));

		expect(formationInitialeMapped).toEqual(formationInitialeResultExpected);
	});
});

describe('mapFormationInitialeDetailFromStrapi', () => {
	it('map vers les informations supplémentaires du détail d‘une formation initiale', () => {
		const formationInitialeStrapiReponse = aStrapiFormationInitialeDetail({
			attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
			certification: 'Bac + 5',
			conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
			description: 'Je suis une description de formation initiale',
			duree: '1 an',
			identifiant: 'FOR.495',
			intitule: 'BM boulanger',
			niveauEtudesVise: '5',
			poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
			updatedAt: '2023-05-15T09:37:44.283Z',
		});
		const formationExpected: FormationInitialeDetailCMS = aFormationInitialeDetailCMS({
			attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
			conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
			description: 'Je suis une description de formation initiale',
			poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
		});

		expect(mapFormationInitialeDetailFromStrapi(formationInitialeStrapiReponse)).toStrictEqual(formationExpected);
	});
});
