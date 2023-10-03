import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { ApiEuresEmploiEuropeRechercheResponse } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';

export function mapRechercheEmploiEurope(response: ApiEuresEmploiEuropeRechercheResponse): ResultatRechercheEmploiEurope {
	return {
		nombreResultats: response.data.dataSetInfo.totalMatchingCount,
		offreList: response.data.items.map((item) => ({
			id: item.header.handle,
		})),
	};
}
