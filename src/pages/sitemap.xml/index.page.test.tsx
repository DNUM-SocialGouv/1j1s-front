import { navigationItemList } from '~/client/components/layouts/Header/NavigationStructure';
import { flattenNavigationItemList } from '~/pages/sitemap.xml/index.page';

describe('sitemap.xml', () => {
	describe('flattenNavigationItemList', () => {
		it('extrait tous les liens de navigation dans un tableau', () => {
			const navigation = Object.values(navigationItemList);
			const expected = [
				'/contrat-engagement-jeune',
				'/mes-aides',
				'/logements/aides-logement',
				'/mentorat',
				'/creer-mon-cv',
				'/entreprendre',
				'/accompagnement',
				'/espace-jeune',
				'/',
				'/les-entreprises-s-engagent',
				'/je-recrute',
				'/je-deviens-mentor',
				'/immersions',
				'/je-recrute-afpr-poei',
				'/mesures-employeurs',
				'/mon-espace',
				'/service-civique',
				'/benevolat',
				'/logements/annonces',
				'/emplois',
				'/stages',
				'/apprentissage',
				'/jobs-etudiants',
				'/europe',
				'/formations',
				'/decouvrir-les-metiers',
				'/evenements',
			];

			const result = flattenNavigationItemList(navigation);

			expect(result.sort()).toEqual(expected.sort());
		});
	});
});
