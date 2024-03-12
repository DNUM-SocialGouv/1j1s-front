import { mapArticle } from '~/server/articles/infra/strapiArticle.mapper';
import {
	flatMapSingleImage,
	flatMapSingleRelation,
	getExtraitContenu,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { MesureEmployeur } from '~/server/mesures-employeurs/domain/mesureEmployeur';
import { StrapiMesuresEmployeurs } from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs';

export function mapMesuresEmployeurs(strapiLesMesuresEmployeurs: StrapiMesuresEmployeurs.MesuresEmployeurs): Array<MesureEmployeur> {
	return strapiLesMesuresEmployeurs.dispositifs.map((strapiLesMesuresEmployeursDispositif) => {
		const article = strapiLesMesuresEmployeursDispositif.article && flatMapSingleRelation(strapiLesMesuresEmployeursDispositif.article);

		return {
			article: article && mapArticle(article),
			banniere: flatMapSingleImage(strapiLesMesuresEmployeursDispositif.banniere),
			contenu: strapiLesMesuresEmployeursDispositif.contenu,
			extraitContenu: getExtraitContenu(strapiLesMesuresEmployeursDispositif.contenu, 110),
			link: article ? `/articles/${article.slug}` : strapiLesMesuresEmployeursDispositif.url,
			pourQui: strapiLesMesuresEmployeursDispositif.pourQui || '',
			titre: strapiLesMesuresEmployeursDispositif.titre,
			url: strapiLesMesuresEmployeursDispositif.url,
		};
	});
}

