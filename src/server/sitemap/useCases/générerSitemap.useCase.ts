import {
	isNavigationItem,
	NavigationItem,
	navigationItemList,
	NavigationItemWithChildren,
} from '~/client/components/layouts/Header/NavigationStructure';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either, isSuccess } from '~/server/errors/either';

const DÉCOUVRIR_LES_METIERS_ROOT_PATH = 'decouvrir-les-metiers';
const ARTICLE_ROOT_PATH = 'articles';
const FAQ_ROOT_PATH = 'faq';
const ANNONCE_DE_LOGEMENT_ROOT_PATH = 'logements/annonces';
const STAGE_ROOT_PATH = 'stages';
const FOOTER_STATIC_PATH_LIST = [
	'/faq',
	'/plan-du-site',
	'/cgu',
	'/accessibilite',
	'/mentions-legales',
	'/confidentialite',
];
export class GénérerSitemapUseCase {
	constructor(private cmsRepository: CmsRepository) {
	}

	async handle(baseUrl: string): Promise<string> {
		const staticPathList = this.flattenNavigationItemList(Object.values(navigationItemList()));
		staticPathList.push(...FOOTER_STATIC_PATH_LIST);

		const [ficheMetierNomMetierListResult, articleSlugListResult, faqSlugListResult, offreDeStageSlugListResult, annonceDeLogementSlugListResult] = await Promise.all([
			this.cmsRepository.listAllFicheMetierNomMetier(),
			this.cmsRepository.listAllArticleSlug(),
			this.cmsRepository.listAllFAQSlug(),
			this.cmsRepository.listAllOffreDeStageSlug(),
			this.cmsRepository.listAllAnnonceDeLogementSlug(),
		]);
		const dynamicPathList = [
			...this.mapDynamicPathListResult(ficheMetierNomMetierListResult, DÉCOUVRIR_LES_METIERS_ROOT_PATH),
			...this.mapDynamicPathListResult(articleSlugListResult, ARTICLE_ROOT_PATH),
			...this.mapDynamicPathListResult(faqSlugListResult, FAQ_ROOT_PATH),
			...this.mapDynamicPathListResult(offreDeStageSlugListResult, STAGE_ROOT_PATH),
			...this.mapDynamicPathListResult(annonceDeLogementSlugListResult, ANNONCE_DE_LOGEMENT_ROOT_PATH),

		];
		const pathList = [...staticPathList, ...dynamicPathList];
		return this.generateSiteMap(pathList, baseUrl);
	}
	
	private flattenNavigationItemList(navigationItemList: Array<NavigationItem | NavigationItemWithChildren>): Array<string> {
		return navigationItemList.reduce((pathList: Array<string>, navigationItem: NavigationItem | NavigationItemWithChildren): Array<string> => {
			if (isNavigationItem(navigationItem)) {
				pathList.push(navigationItem.link);
			} else {
				pathList.push(...this.flattenNavigationItemList(navigationItem.children));
			}
			return pathList;
		}, []);
	}
	
	private mapDynamicPathListResult(dynamicPathListResult: Either<Array<string>>, rootPath: string): Array<string> {
		if(isSuccess(dynamicPathListResult)) {
			return dynamicPathListResult.result
				.map(this.escapeSpecialCharacters)
				.map((path) => `/${rootPath}/${path}`);
		} else {
			return [];
		}
	}

	private generateSiteMap(pathList: string[], baseUrl: string) {
		return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pathList.map((path) => `
	<url>
		<loc>${baseUrl}${path}</loc>
	</url>`).join('')}
</urlset>`;
	}

	private escapeSpecialCharacters(unsafeString: string): string {
		return unsafeString.replace(/[<>&'"/]/g, function (character) {
			switch (character) {
				case '<':
					return '&lt;';
				case '>':
					return '&gt;';
				case '&':
					return '&amp;';
				case '\'':
					return '&apos;';
				case '"':
					return '&quot;';
				case '/':
					return '%2F';
				default:
					return '';
			}
		});
	}
}
