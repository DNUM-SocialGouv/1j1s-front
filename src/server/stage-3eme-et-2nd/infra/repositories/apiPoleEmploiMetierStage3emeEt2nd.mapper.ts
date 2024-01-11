import { MetierStage3emeEt2nd } from '../../domain/metierStage3emeEt2nd';
import { ApiPoleEmploiMetierStage3emeEt2nd } from './apiPoleEmploiMetierStage3emeEt2nd';

export function mapMetierStage3eme(apiPoleEmploiMetierStage3eme: ApiPoleEmploiMetierStage3emeEt2nd[]): MetierStage3emeEt2nd[] {
	return apiPoleEmploiMetierStage3eme.map((metier) => ({
		code: metier.code,
		label: metier.libelle,
	}));
}
