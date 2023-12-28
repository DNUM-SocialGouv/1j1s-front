import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { MetierAlternance } from '~/server/metiers/domain/metier';

export const mapMetier = (response: MetierLaBonneAlternanceApiResponse): Array<MetierAlternance> => {
	const listeMetiers = response.labelsAndRomes;
	return listeMetiers.map((metier) => ({
		codeRomes: metier.romes,
		label: metier.label,
	}));
};
