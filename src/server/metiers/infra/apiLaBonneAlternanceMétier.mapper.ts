import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { Metier } from '~/server/metiers/domain/metier';

export const mapMétier = (response: MetierLaBonneAlternanceApiResponse): Array<Metier> => {
	const résultats = response.labelsAndRomes;
	return résultats.map((metier) => ({
		label: metier.label,
		romes: metier.romes,
	}));
};
