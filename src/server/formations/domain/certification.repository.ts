import { Either } from '~/server/errors/either';
import { Certification } from '~/server/formations/domain/certification';

export interface CertificationRepository {
	get(codeCertification: string, codePostal: string): Promise<Either<Certification>>
}
