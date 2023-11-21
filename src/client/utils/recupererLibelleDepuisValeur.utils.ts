import { Option } from '~/client/components/ui/Select/Select';

export function recupererLibelleDepuisValeur(optionList: Option[], valeur: string): string {
	const optionTrouvée = optionList.find((option) => option.valeur === valeur);
	return optionTrouvée?.libellé || '';
}
