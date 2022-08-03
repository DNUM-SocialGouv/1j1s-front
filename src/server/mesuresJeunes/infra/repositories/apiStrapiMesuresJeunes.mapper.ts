import { CarteMesuresJeunes, MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';
import { Strapi } from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.response';
import { parseMarkdown } from '~/server/services/utils/markdown.util';

function mapCartesMesuresJeunes(listCartesMesuresJeunes: Strapi.CarteMesuresJeunes[]): CarteMesuresJeunes[] {
  const newListCartesMesuresJeunes = listCartesMesuresJeunes.map((carteMesuresJeunes) => {
    return {
      bannière: carteMesuresJeunes.banniere.data.attributes,
      contenu: parseMarkdown(carteMesuresJeunes.contenu),
      titre: carteMesuresJeunes.titre,
      url: carteMesuresJeunes.url,
    };
  });
  return newListCartesMesuresJeunes;
}

export function mapMesuresJeunes(mesuresJeunesResponse: Strapi.MesuresJeunesContentType): MesuresJeunes {
  const { vieProfessionnelle, aidesFinancieres, accompagnement, orienterFormer } = mesuresJeunesResponse.data.attributes;
  return {
    accompagnement: mapCartesMesuresJeunes(accompagnement),
    aidesFinancieres: mapCartesMesuresJeunes(aidesFinancieres),
    orienterFormer: mapCartesMesuresJeunes(orienterFormer),
    vieProfessionnelle: mapCartesMesuresJeunes(vieProfessionnelle),
  };
}
