import { CarteMesuresJeunes, MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';
import { CarteMesuresJeunesResponse, MesuresJeunesContentType } from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.response';
import { parseMarkdown } from '~/server/services/utils/markdown.util';

function mapCartesMesuresJeunes(cartesMesuresJeunesList: CarteMesuresJeunesResponse[]): CarteMesuresJeunes[] {
  const newListCartesMesuresJeunes = cartesMesuresJeunesList.map((carteMesuresJeunes) => {
    return {
      bannière: carteMesuresJeunes.banniere.data.attributes,
      contenu: parseMarkdown(carteMesuresJeunes.contenu),
      titre: carteMesuresJeunes.titre,
      url: carteMesuresJeunes.url,
    };
  });
  return newListCartesMesuresJeunes;
}

export function mapMesuresJeunes(mesuresJeunesResponse: MesuresJeunesContentType): MesuresJeunes {
  const { vieProfessionnelle, aidesFinancieres, accompagnement, orienterFormer } = mesuresJeunesResponse.data.attributes;
  return {
    accompagnement: mapCartesMesuresJeunes(accompagnement),
    aidesFinancieres: mapCartesMesuresJeunes(aidesFinancieres),
    orienterFormer: mapCartesMesuresJeunes(orienterFormer),
    vieProfessionnelle: mapCartesMesuresJeunes(vieProfessionnelle),
  };
}
