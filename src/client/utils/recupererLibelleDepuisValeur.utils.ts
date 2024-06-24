import { OptionSelect } from '~/client/components/ui/Form/Select/Select';

export function recupererLibelleDepuisValeur(optionList: OptionSelect[], valeur: string): string {
	const optionTrouvée = optionList.find((option) => option.valeur === valeur);
	return optionTrouvée?.libellé || '';
}
