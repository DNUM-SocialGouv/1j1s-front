import { Either } from '~/server/errors/either';
import { Certification } from '~/server/formations/domain/certification';
import { CertificationRepository } from '~/server/formations/domain/certification.repository';

export class ConsulterStatistiqueFormationUseCase {
	constructor(private repository: CertificationRepository) {}
	
	async handle(codeCertification: string, codePostal: string): Promise<Either<Certification>> {
		return this.repository.get(codeCertification, codePostal);
	}
}
