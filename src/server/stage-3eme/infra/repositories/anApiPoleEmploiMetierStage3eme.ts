import { ApiPoleEmploiMetierStage3eme } from '~/server/stage-3eme/infra/repositories/apiPoleEmploiMetierStage3eme';

export function anApiPoleEmploiMetierStage3eme(overrides?: Partial<ApiPoleEmploiMetierStage3eme>): ApiPoleEmploiMetierStage3eme {
	return {
		code: '11573',
		libelle: 'Boulanger/Boulangère',
		...overrides,
	};
}
