import { MetierCodeAppellation } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';

import { MetierStage3eme } from './metierStage3eme';

export function aListeDeMetierStage3eme(): MetierStage3eme[] {
	return [
		aMetierStage3eme({
			code: new MetierCodeAppellation('code1'),
			label: 'libelle1',
		}),
		aMetierStage3eme({
			code: new MetierCodeAppellation('code2'),
			label: 'libelle2',
		}),
	];
}

export function aMetierStage3eme(overrides?: Partial<MetierStage3eme>): MetierStage3eme {
	return {
		code: new MetierCodeAppellation('11573'),
		label: 'Boulanger/Boulangère',
		...overrides,
	};
}
