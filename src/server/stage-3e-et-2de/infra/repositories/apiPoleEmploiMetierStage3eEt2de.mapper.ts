import { MetierStage3eEt2de } from '../../domain/metierStage3eEt2de';
import { ApiPoleEmploiMetierStage3eEt2de } from './apiPoleEmploiMetierStage3eEt2de';

export function mapMetierStage3eEt2de(apiPoleEmploiMetierStage3eEt2de: ApiPoleEmploiMetierStage3eEt2de[]): MetierStage3eEt2de[] {
	return apiPoleEmploiMetierStage3eEt2de.map((metier) => ({
		code: metier.code,
		label: metier.libelle,
	}));
}
