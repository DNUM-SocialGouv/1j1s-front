import {
	ApiFranceTravailMetierStage3eEt2de,
} from '~/server/stage-3e-et-2de/infra/repositories/apiFranceTravailMetierStage3eEt2de';

export function anApiFranceTravailMetierStage3eEt2de(overrides?: Partial<ApiFranceTravailMetierStage3eEt2de>): ApiFranceTravailMetierStage3eEt2de {
	return {
		code: '11573',
		libelle: 'Boulanger/Boulangère',
		...overrides,
	};
}
