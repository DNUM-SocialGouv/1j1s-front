import { uneAnnonceDeLogementResponse } from '~/server/cms/domain/annonceDeLogement.fixture';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { anArticle } from '~/server/cms/domain/article.fixture';
import { anEspaceJeune, anEspaceJeuneResponse } from '~/server/cms/domain/espaceJeune.fixture';
import { aStrapiArticle } from '~/server/cms/infra/repositories/strapi.fixture';
import {
	mapAnnonceLogement,
	mapArticle,
	mapEspaceJeune,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

describe('strapi mapper', () => {
	describe('mapArticle', () => {
		it('retourne l‘article', () => {
			const articleResponse = aStrapiArticle();
			const expectedArticle = anArticle();
			const article = mapArticle(articleResponse);
			expect(article).toEqual(expectedArticle);
		});
	});

	describe('mapEspaceJeune', () => {
		describe('lorsque la liste contient les espaces jeune', () => {
			it('retourne les espaces jeunes', () => {
				const espaceJeuneResponse = anEspaceJeuneResponse();
				const expectedEspaceJeune = anEspaceJeune();
				const espaceJeune = mapEspaceJeune(espaceJeuneResponse);
				expect(espaceJeune).toEqual(expectedEspaceJeune);
			});
		});
	});

	describe('mapAnnonceLogement', () => {
		it('flatten les services', async () => {
			const annonceResponse = uneAnnonceDeLogementResponse();
			annonceResponse.servicesInclus = [
				{ nom: Strapi.CollectionType.AnnonceLogement.ServiceInclus.INTERNET },
			];
			annonceResponse.servicesOptionnels = [
				{ nom: Strapi.CollectionType.AnnonceLogement.ServiceOptionnel.TV },
			];

			const annonce = mapAnnonceLogement(annonceResponse);

			expect(annonce.servicesInclus).toEqual([AnnonceDeLogement.ServiceInclus.INTERNET]);
			expect(annonce.servicesOptionnels).toEqual([AnnonceDeLogement.ServiceInclus.TV]);
		});
	});
});
