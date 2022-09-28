import { AlternanceFiltre } from '~/server/alternances/domain/alternance';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export function buildParamètresRechercheLaBonneAlternance({ code, latitude, longitude, radius, codeRomeList }: AlternanceFiltre) {
  const queryList: Record<string, string> = {
    insee: code ? code : '',
    latitude: latitude ? latitude : '',
    longitude: longitude ? longitude : '',
    radius: radius ? radius : '',
    romes: codeRomeList ? codeRomeList.toString() : '',
  };
  removeUndefinedValueInQueryParameterList(queryList);
  const params = new URLSearchParams(queryList);
  return `${params.toString()}&caller=1jeune1solution`;
}
