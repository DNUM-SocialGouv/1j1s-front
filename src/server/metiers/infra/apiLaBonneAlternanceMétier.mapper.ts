import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { Métier } from '~/server/metiers/domain/métier';

export const mapMétier = (response: MetierLaBonneAlternanceApiResponse): Array<Métier> => {
	const résultats = response.labelsAndRomes;
	return résultats.map((metier) => ({
		label: metier.label,
		romes: metier.romes,
	}));
};
