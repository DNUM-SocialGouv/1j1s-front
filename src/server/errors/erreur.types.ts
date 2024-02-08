import { ErreurMetier } from './erreurMetier.types';
import { ErreurTechnique } from './erreurTechnique.types';

export type Erreur = ErreurMetier | ErreurTechnique;

export function isErreur(erreur: unknown): erreur is Erreur {
	return Object.values(ErreurMetier).includes(erreur as ErreurMetier)
		|| Object.values(ErreurTechnique).includes(erreur as ErreurTechnique);
}

