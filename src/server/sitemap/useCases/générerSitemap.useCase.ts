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

export class GénérerSitemapUseCase {
	constructor(private cmsRepository: CmsRepository) {
	}

	async handle(baseUrl: string): Promise<string> {
		const staticPathList = this.flattenNavigationItemList(Object.values(navigationItemList));
		// TODO: ajouter les stages
		const [ficheMetierNomMetierListResult, articleSlugListResult] = await Promise.all([
			this.cmsRepository.listAllFicheMetierNomMetier(),
			this.cmsRepository.listAllArticleSlug(),
		]);
		const dynamicPathList = [
			...this.mapDynamicPathListResult(ficheMetierNomMetierListResult, DÉCOUVRIR_LES_METIERS_ROOT_PATH),
			...this.mapDynamicPathListResult(articleSlugListResult, ARTICLE_ROOT_PATH),
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
				.map(this.escapeCharacters)
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

	private escapeCharacters(unsafe: string): string {
		return unsafe.replace(/[<>&'"/]/g, function (c) {
			switch (c) {
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
