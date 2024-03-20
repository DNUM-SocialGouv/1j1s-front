import { flatMapSingleImage, flatMapSingleRelation } from '~/server/cms/infra/repositories/strapi.utils';
import { MesureEmployeur } from '~/server/mesures-employeurs/domain/mesureEmployeur';
import { StrapiMesuresEmployeurs } from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs';

export function mapMesuresEmployeurs(strapiLesMesuresEmployeurs: StrapiMesuresEmployeurs.MesuresEmployeurs): Array<MesureEmployeur> {
	return strapiLesMesuresEmployeurs.dispositifs.map((strapiLesMesuresEmployeursDispositif) => {
		const article = strapiLesMesuresEmployeursDispositif.article && flatMapSingleRelation(strapiLesMesuresEmployeursDispositif.article);

		return {
			banniere: flatMapSingleImage(strapiLesMesuresEmployeursDispositif.banniere),
			link: article ? `/articles/${article.slug}` : strapiLesMesuresEmployeursDispositif.url,
			pourQui: strapiLesMesuresEmployeursDispositif.pourQui || '',
			titre: strapiLesMesuresEmployeursDispositif.titre,
		};
	});
}

