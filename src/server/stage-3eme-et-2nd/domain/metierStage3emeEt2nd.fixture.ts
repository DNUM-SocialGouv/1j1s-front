import { MetierStage3emeEt2nd } from './metierStage3emeEt2nd';

export function aListeDeMetierStage3eme(): MetierStage3emeEt2nd[] {
	return [
		aMetierStage3emeEt2nd({
			code: 'code1',
			label: 'libelle1',
		}),
		aMetierStage3emeEt2nd({
			code: 'code2',
			label: 'libelle2',
		}),
	];
}

export function aMetierStage3emeEt2nd(overrides?: Partial<MetierStage3emeEt2nd>): MetierStage3emeEt2nd {
	return {
		code: '11573',
		label: 'Boulanger/Boulangère',
		...overrides,
	};
}
