import { Either } from '~/server/errors/either';
import { CertificationRepository } from '~/server/formations/domain/certification.repository';
import { Statistique } from '~/server/formations/domain/statistique';

export class ConsulterStatistiqueFormationUseCase {
	constructor(private repository: CertificationRepository) {}
	
	async handle(codeCertification: string, codePostal: string): Promise<Either<Statistique>> {
		return this.repository.get(codeCertification, codePostal);
	}
}
