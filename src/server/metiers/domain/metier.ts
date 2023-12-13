import { MetierCode, MetierCodeRome } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';

export interface MetierLba {
	label: string
	code: Array<MetierCodeRome>
}

export interface Metier {
	label: string
	code: Array<MetierCode>
}
