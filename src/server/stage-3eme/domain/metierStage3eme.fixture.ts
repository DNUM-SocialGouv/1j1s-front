import { MetierStage3eme } from './metierStage3eme';

export function aListeDeMetierStage3eme(): MetierStage3eme[] {
	return [
		aMetierStage3eme({
			code: 'code1',
			label: 'libelle1',
		}),
		aMetierStage3eme({
			code: 'code2',
			label: 'libelle2',
		}),
	];
}

export function aMetierStage3eme(overrides?: Partial<MetierStage3eme>): MetierStage3eme {
	return {
		code: '11573',
		label: 'Boulanger/Boulangère',
		...overrides,
	};
}
