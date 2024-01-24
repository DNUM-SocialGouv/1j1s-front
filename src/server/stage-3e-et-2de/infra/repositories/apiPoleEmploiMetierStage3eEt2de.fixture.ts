import {
	ApiPoleEmploiMetierStage3eEt2de,
} from '~/server/stage-3e-et-2de/infra/repositories/apiPoleEmploiMetierStage3eEt2de';

export function anApiPoleEmploiMetierStage3eEt2de(overrides?: Partial<ApiPoleEmploiMetierStage3eEt2de>): ApiPoleEmploiMetierStage3eEt2de {
	return {
		code: '11573',
		libelle: 'Boulanger/Boulangère',
		...overrides,
	};
}
