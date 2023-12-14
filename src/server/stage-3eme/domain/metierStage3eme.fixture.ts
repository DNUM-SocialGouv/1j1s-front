import { MetierCodeAppellation } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';

import { MetierStage3eme } from './metierStage3eme';

export function aListeDeMetierStage3eme(): MetierStage3eme[] {
	return [
		{
			code: [new MetierCodeAppellation('code1')],
			label: 'libelle1',
		},
		{
			code: [new MetierCodeAppellation('code2')],
			label: 'libelle2',
		},
	];
}
