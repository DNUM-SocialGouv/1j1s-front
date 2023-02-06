import { GetServerSidePropsContext } from 'next';

import {
	isNavigationItem,
	NavigationItem,
	navigationItemList,
	NavigationItemWithChildren,
} from '~/client/components/layouts/Header/NavigationStructure';

export default function SiteMap() {
	return null;
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	const baseUrl = `https://${req.headers.host}`;
	const staticPathList = flattenNavigationItemList(Object.values(navigationItemList));
	// TODO: ajouter les articles et les fiches métiers
	const sitemap = generateSiteMap(staticPathList, baseUrl);

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export function flattenNavigationItemList(navigationItemList: Array<NavigationItem | NavigationItemWithChildren>): Array<string> {
	return navigationItemList.reduce((pathList: Array<string>, navigationItem: NavigationItem | NavigationItemWithChildren): Array<string> => {
		if (isNavigationItem(navigationItem)) {
			pathList.push(navigationItem.link);
		} else {
			pathList.push(...flattenNavigationItemList(navigationItem.children));
		}
		return pathList;
	}, []);
}

function generateSiteMap(pathList: string[], baseUrl: string) {
	return `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${pathList.map((path) => `
				<url>
					<loc>${baseUrl}${path}</loc>
				</url>
			`)
		.join('')}
		</urlset>
	`;
}
