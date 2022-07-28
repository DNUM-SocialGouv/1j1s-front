import { AlternanceFiltre } from '~/server/alternances/domain/alternance';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export function buildParamètresRechercheLaBonneAlternance(alternanceFiltre: AlternanceFiltre) {
  // eslint-disable-next-line
  const queryList: Record<string, any> = {
    insee: alternanceFiltre.code,
    latitude: alternanceFiltre.latitude,
    longitude: alternanceFiltre.longitude,
    radius: alternanceFiltre.radius,
    romes: alternanceFiltre.codeRomeList.toString(),
  };
  removeUndefinedValueInQueryParameterList(queryList);
  const params = new URLSearchParams(queryList);
  return `${params.toString()}&caller=1jeune1solution`;
}
