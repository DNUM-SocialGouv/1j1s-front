import { MetierStage3eEt2de } from '../../domain/metierStage3eEt2de';
import { ApiFranceTravailMetierStage3eEt2de } from './apiFranceTravailMetierStage3eEt2de';

export function mapMetierStage3eEt2de(apiFranceTravailMetierStage3eEt2de: ApiFranceTravailMetierStage3eEt2de[]): MetierStage3eEt2de[] {
	return apiFranceTravailMetierStage3eEt2de.map((metier) => ({
		code: metier.code,
		label: metier.libelle,
	}));
}
