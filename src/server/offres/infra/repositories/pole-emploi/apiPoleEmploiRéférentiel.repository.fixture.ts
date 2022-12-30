import {
	ApiPoleEmploiRéférentielRepository,
} from './apiPoleEmploiRéférentiel.repository';

export function aApiPoleEmploiRéférentielRepository(): ApiPoleEmploiRéférentielRepository {
	return {
		findCodeInseeInRéférentielCommune: jest.fn(),
	} as unknown as ApiPoleEmploiRéférentielRepository;
}
export function aRésultatsRéférentielCommunesResponseList() {
	return [
		{
			code: '21489',
			codeDepartement: '21',
			codePostal: '21440',
			libelle: 'POISEUL LA GRANGE',
		},
		{
			code: '55221',
			codeDepartement: '55',
			codePostal: '55000',
			libelle: 'GUERPONT',
		},
		{
			code: '79106',
			codeDepartement: '79',
			codePostal: '79110',
			libelle: 'COUTURE D ARGENSON',
		},
	];
}
