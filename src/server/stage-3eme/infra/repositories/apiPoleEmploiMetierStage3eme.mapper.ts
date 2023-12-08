import { MetierStage3eme } from '../../domain/metierStage3eme';
import { ApiPoleEmploiMetierStage3eme } from './apiPoleEmploiMetierStage3eme';

export function mapMetierStage3eme(apiPoleEmploiMetierStage3eme: ApiPoleEmploiMetierStage3eme[]): MetierStage3eme[] {
	return apiPoleEmploiMetierStage3eme.map((metier) => ({
		code: metier.code,
		libelle: metier.libelle,
	}));
}
