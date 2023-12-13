import { MetierCodeRome } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';
import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { MetierLba } from '~/server/metiers/domain/metier';

export const mapMetier = (response: MetierLaBonneAlternanceApiResponse): Array<MetierLba> => {
	const listeMetiers = response.labelsAndRomes;
	return listeMetiers.map((metier) => ({
		code: metier.romes.map((rome) => (new MetierCodeRome(rome))),
		label: metier.label,
	}));
};
