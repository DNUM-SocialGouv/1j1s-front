import { Either } from '~/server/errors/either';
import { Statistique } from '~/server/formations/domain/statistique';

export interface StatistiqueRepository {
	get(codeCertification: string, codePostal: string): Promise<Either<Statistique>>
}
