interface OptionsCacheSitemap {
	ttlMs: number;
	seuilMinUrls: number;
}

// Cache en mémoire du sitemap avec verrou « single-flight ».
//
// Contexte : la route /api/sitemap régénérait les 5 collections du CMS à CHAQUE requête,
// sans aucun cache. Couplé au fan-out de pagination côté client Strapi, cela envoyait des
// centaines de requêtes quasi simultanées vers le CMS (conteneur unique) et le saturait
// jusqu'au crash en production (incidents du 24/06 et du 05/07 2026).
//
// Deux protections complémentaires ici :
//  1. memoize TTL : tant qu'une réponse est fraîche, elle est servie sans rappeler le CMS.
//  2. single-flight : si une régénération est déjà en cours, les requêtes concurrentes
//     attendent la MÊME promesse au lieu d'en déclencher chacune une (c'est ce qui évite
//     la rafale, y compris au démarrage à froid après un redémarrage du conteneur).
//
// Garde-fous (le cache ne doit jamais rendre la situation pire qu'avant) :
//  - on ne met en cache QUE les réponses valides (au moins `seuilMinUrls` URLs), jamais un
//    sitemap tronqué qui figerait une réponse incomplète pendant tout le TTL ;
//  - on ne met JAMAIS une erreur en cache, et le verrou est toujours relâché (pas de « poison ») ;
//  - en cas d'échec de régénération, on ressert le dernier bon XML s'il existe (stale-on-error),
//    sinon on propage l'erreur, ce qui est exactement le comportement de l'ancien code.
export function créerCacheSitemap(générer: () => Promise<string>, options: OptionsCacheSitemap): () => Promise<string> {
	let xmlEnCache: string | null = null;
	let expiration = 0;
	let générationEnCours: Promise<string> | null = null;

	const compterUrls = (xml: string): number => (xml.match(/<url>/g) ?? []).length;

	return async function obtenirSitemap(): Promise<string> {
		if (xmlEnCache !== null && Date.now() < expiration) {
			return xmlEnCache;
		}
		// Une seule régénération à la fois : les appels concurrents partagent cette promesse.
		if (générationEnCours === null) {
			générationEnCours = (async () => {
				try {
					const xml = await générer();
					if (compterUrls(xml) >= options.seuilMinUrls) {
						xmlEnCache = xml;
						expiration = Date.now() + options.ttlMs;
					}
					return xml;
				} finally {
					générationEnCours = null;
				}
			})();
		}
		try {
			return await générationEnCours;
		} catch (erreur) {
			if (xmlEnCache !== null) {
				return xmlEnCache;
			}
			throw erreur;
		}
	};
}
