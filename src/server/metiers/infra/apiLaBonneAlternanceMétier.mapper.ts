import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { Metier } from '~/server/metiers/domain/metier';

export const mapMetier = (response: MetierLaBonneAlternanceApiResponse): Array<Metier> => {
	const listeMetiers = response.labelsAndRomes;
	return listeMetiers.map((metier) => ({
		label: metier.label,
		romes: metier.romes,
	}));
};
