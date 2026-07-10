import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { créerCacheSitemap } from '~/server/sitemap/infra/sitemapCache';
import { dependencies } from '~/server/start';

// Durée de fraîcheur du sitemap en cache. 6h par défaut : un sitemap n'est qu'un indice de
// découverte pour les moteurs, il n'a pas besoin d'être régénéré à chaque requête (c'est
// justement ce qui saturait le CMS). Pilotable par env sans redéployer le code.
const SITEMAP_TTL_S = Number(process.env.SITEMAP_CACHE_TTL_S) || 21600;

// Instancié UNE seule fois au niveau module, pour que le cache survive entre les requêtes
// (le module d'une route API Next est chargé une fois par process). Le générateur est passé
// en closure, donc résolu paresseusement au premier appel (pas de dépendance au moment du chargement).
const obtenirSitemap = créerCacheSitemap(
	() => dependencies.sitemapDependencies.générerSitemapUseCase.handle(),
	{ ttlMs: SITEMAP_TTL_S * 1000, seuilMinUrls: 50 },
);

export default async function générerSitemapXml(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	try {
		const sitemap = await obtenirSitemap();

		res.setHeader('Content-Type', 'text/xml; charset=utf-8');
		// Indice de cache pour un éventuel CDN en amont (sans effet tant qu'aucune règle CDN ne
		// force la mise en cache de cette route ; le cache in-process reste le mécanisme actif).
		res.setHeader('Cache-Control', `public, s-maxage=${SITEMAP_TTL_S}, stale-while-revalidate=86400`);
		res.setHeader('X-Content-Type-Options', 'nosniff');
		res.write(sitemap);
		res.end();
	} catch {
		// Génération à froid en échec (CMS indisponible et aucun XML précédent à resservir) :
		// on renvoie 503 + Retry-After plutôt qu'un sitemap vide, qui ferait déréférencer les URLs.
		res.setHeader('Retry-After', '60');
		res.status(503).end();
	}
}
