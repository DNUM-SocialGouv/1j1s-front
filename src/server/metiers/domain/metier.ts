import { MetierCode, MetierCodeRome } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';

export interface MetierLba extends Metier {
	label: string
	code: MetierCodeRome
}

export interface Metier {
	label: string
	code: MetierCode
}
