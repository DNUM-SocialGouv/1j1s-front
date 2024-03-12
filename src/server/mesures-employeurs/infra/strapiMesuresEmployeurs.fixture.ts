import { aStrapiArticle } from '~/server/articles/infra/strapiArticle.fixture';
import { aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';
import { StrapiMesuresEmployeurs } from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs';

export function aStrapiMesuresEmployeursList(overrides?: Partial<StrapiMesuresEmployeurs.MesuresEmployeurs>): StrapiMesuresEmployeurs.MesuresEmployeurs {
	return {
		dispositifs: [
			aStrapiMesureEmployeur({
				article: aStrapiSingleRelation(aStrapiArticle()),
			}),
			aStrapiMesureEmployeur({
				article: aStrapiSingleRelation(aStrapiArticle({ slug: 'slug-article' })),
				contenu: 'Un deuxième beau contenu de carte',
				titre: 'Un deuxième titre de carte',
				url: 'https://some.example.com/2',
			}),
			aStrapiMesureEmployeur({
				article: aStrapiSingleRelation(aStrapiArticle({ slug: 'titre' })),
				contenu: 'Un troisième beau contenu de carte',
				titre: 'Un troisième titre de carte',
				url: 'https://some.example.com/3',
			}),
			aStrapiMesureEmployeur({
				article: aStrapiSingleRelation(aStrapiArticle({ slug: 'titre' })),
				contenu: 'Un quatrième beau contenu de carte',
				titre: 'Un quatrième titre de carte',
				url: 'https://some.example.com/4',
			}),
		],
		...overrides,
	};
}


export function aStrapiMesureEmployeur(overrides?: Partial<StrapiMesuresEmployeurs.Dispositif>): StrapiMesuresEmployeurs.Dispositif {
	return {
		article: aStrapiSingleRelation(aStrapiArticle()),
		banniere: aStrapiSingleRelation(aStrapiImage()),
		contenu: 'Un beau contenu de carte',
		pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
		titre: 'Un titre de carte',
		url: 'https://some.example.com/1',
		...overrides,
	};
}
