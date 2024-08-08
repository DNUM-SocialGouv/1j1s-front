import { flatMapSingleImage, flatMapSingleRelation } from '~/server/cms/infra/repositories/strapi.utils';
import { MesureEmployeur } from '~/server/mesures-employeurs/domain/mesureEmployeur';
import { StrapiMesuresEmployeurs } from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs';

export function mapMesuresEmployeurs(strapiLesMesuresEmployeurs: StrapiMesuresEmployeurs.MesuresEmployeurs): Array<MesureEmployeur> {
	return strapiLesMesuresEmployeurs.dispositifs.map((strapiLesMesuresEmployeursDispositif) => {
		return {
			banniere: flatMapSingleImage(strapiLesMesuresEmployeursDispositif.banniere),
			link: mapMesureEmployeurLink(strapiLesMesuresEmployeursDispositif),
			pourQui: strapiLesMesuresEmployeursDispositif.pourQui || '',
			titre: strapiLesMesuresEmployeursDispositif.titre,
		};
	});
}

function mapMesureEmployeurLink(dispositif: StrapiMesuresEmployeurs.Dispositif): string | undefined {
	const article = dispositif.article && flatMapSingleRelation(dispositif.article);
	if(!article && !dispositif.url) {
		return undefined;
	}
	return article ? `/articles/${article.slug}` : dispositif.url;
}
