import { MetierStage3eEt2de } from './metierStage3eEt2de';

export function aListeDeMetierStage3eEt2de(): MetierStage3eEt2de[] {
	return [
		aMetierStage3eEt2de({
			code: 'code1',
			label: 'libelle1',
		}),
		aMetierStage3eEt2de({
			code: 'code2',
			label: 'libelle2',
		}),
	];
}

export function aMetierStage3eEt2de(overrides?: Partial<MetierStage3eEt2de>): MetierStage3eEt2de {
	return {
		code: '11573',
		label: 'Boulanger/Boulangère',
		...overrides,
	};
}
