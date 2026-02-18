import { createSuccess } from '~/server/errors/either';
import { aFicheMetier, aListNomMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';

export function aFicheMetierRepository(override?:Partial<FicheMetierRepository>): FicheMetierRepository {
	return {
		getAllNomsMetiers: vi.fn().mockResolvedValue(createSuccess(aListNomMetier())),
		getFicheMetierByNom: vi.fn().mockResolvedValue(createSuccess(aFicheMetier())),
		...override,
	};
}
