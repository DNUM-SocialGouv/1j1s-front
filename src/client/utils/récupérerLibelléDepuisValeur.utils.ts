import { Option } from '~/client/components/ui/Select/Select';

export function récupérerLibelléDepuisValeur(optionList: Option[], valeur: string, placeholder = ''): string {
	const optionTrouvée = optionList.find((option) => option.valeur === valeur);
	return optionTrouvée?.libellé || placeholder;
}
