import { MetierCodeAppellation } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';
import { Metier } from '~/server/metiers/domain/metier';

export interface MetierStage3eme extends Metier {
	code: MetierCodeAppellation
	label: string
}
