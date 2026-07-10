import { créerCacheSitemap } from '~/server/sitemap/infra/sitemapCache';

function xmlAvecUrls(nombre: number): string {
	return `<urlset>${'<url><loc>https://exemple/x</loc></url>'.repeat(nombre)}</urlset>`;
}

describe('créerCacheSitemap', () => {
	it('sert la valeur en cache sans rappeler le générateur tant qu\'elle est fraîche', async () => {
		const générer = vi.fn().mockResolvedValue(xmlAvecUrls(100));
		const obtenir = créerCacheSitemap(générer, { ttlMs: 10_000, seuilMinUrls: 10 });

		await obtenir();
		await obtenir();

		expect(générer).toHaveBeenCalledTimes(1);
	});

	it('single-flight : des appels concurrents ne déclenchent qu\'une seule génération', async () => {
		let résoudre: (xml: string) => void = () => {};
		const générer = vi.fn().mockImplementation(() => new Promise<string>((r) => { résoudre = r; }));
		const obtenir = créerCacheSitemap(générer, { ttlMs: 10_000, seuilMinUrls: 10 });

		const appels = Promise.all([obtenir(), obtenir(), obtenir()]);
		résoudre(xmlAvecUrls(100));
		const résultats = await appels;

		expect(générer).toHaveBeenCalledTimes(1);
		expect(résultats).toEqual([xmlAvecUrls(100), xmlAvecUrls(100), xmlAvecUrls(100)]);
	});

	it('ne met pas en cache une réponse sous le seuil (sitemap tronqué), donc régénère', async () => {
		const générer = vi.fn().mockResolvedValue(xmlAvecUrls(3));
		const obtenir = créerCacheSitemap(générer, { ttlMs: 10_000, seuilMinUrls: 10 });

		await obtenir();
		await obtenir();

		expect(générer).toHaveBeenCalledTimes(2);
	});

	it('ne met pas une erreur en cache et la propage si aucun bon XML précédent', async () => {
		const générer = vi.fn().mockRejectedValue(new Error('CMS indisponible'));
		const obtenir = créerCacheSitemap(générer, { ttlMs: 10_000, seuilMinUrls: 10 });

		await expect(obtenir()).rejects.toThrow('CMS indisponible');
		await expect(obtenir()).rejects.toThrow('CMS indisponible');
		expect(générer).toHaveBeenCalledTimes(2); // pas de « poison » : chaque appel réessaie
	});

	it('en cas d\'erreur, ressert le dernier bon sitemap si disponible (stale-on-error)', async () => {
		const générer = vi.fn()
			.mockResolvedValueOnce(xmlAvecUrls(100))
			.mockRejectedValueOnce(new Error('CMS indisponible'));
		// ttl négatif : l'entrée est considérée périmée immédiatement, forçant une régénération au 2e appel.
		const obtenir = créerCacheSitemap(générer, { ttlMs: -1, seuilMinUrls: 10 });

		const premier = await obtenir();
		const second = await obtenir();

		expect(premier).toEqual(xmlAvecUrls(100));
		expect(second).toEqual(xmlAvecUrls(100));
		expect(générer).toHaveBeenCalledTimes(2);
	});
});
