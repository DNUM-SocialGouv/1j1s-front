import { anArticle } from '~/server/articles/domain/article.fixture';
import { aStrapiArticle } from '~/server/articles/infra/strapiArticles.fixture';
import { mapArticle } from '~/server/articles/infra/strapiArticles.mapper';
import { anImage } from '~/server/cms/domain/image.fixture';
import { aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';

describe('mapArticle', () => {
	it('map vers un article', () => {
		const result = mapArticle(aStrapiArticle({
			banniere: aStrapiSingleRelation(aStrapiImage()),
			contenu: 'Avec le Parcours Emploi Compétences (PEC), vous permettez à des personnes éloignées de l’emploi de s’insérer professionnellement et vous bénéficiez d’une aide de l’État.',
			slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
			titre: 'Aide à l’embauche d’un jeune en Parcours Emploi Compétences (PEC Jeunes) dans le secteur non marchand',
		}));

		expect(result).toEqual(anArticle({
			bannière: anImage(),
			contenu: 'Avec le Parcours Emploi Compétences (PEC), vous permettez à des personnes éloignées de l’emploi de s’insérer professionnellement et vous bénéficiez d’une aide de l’État.',
			slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
			titre: 'Aide à l’embauche d’un jeune en Parcours Emploi Compétences (PEC Jeunes) dans le secteur non marchand',
		},
		));
	});
});
