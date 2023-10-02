import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { ApiEuresEmploiEuropeRechercheResponse } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';

export function mapRechercheEmploiEurope(response: ApiEuresEmploiEuropeRechercheResponse): ResultatRechercheEmploiEurope {
	return {
		offreList: response.data.items.map((item) => ({
			id: item.header.handle,
		})),
	};
}
