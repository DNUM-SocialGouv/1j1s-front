import { Either } from '~/server/errors/either';

import { Entreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class LesEntreprisesSEngagentUseCase {
	constructor(
    private lEERepository: RejoindreLaMobilisationRepository,
	) {}

	async rejoindreLaMobilisation(entrepriseDemandantARejoindreLaMobilisation: Entreprise): Promise<Either<void>> {
		return await this.lEERepository.save(entrepriseDemandantARejoindreLaMobilisation);
	}
}

export interface RejoindreLaMobilisation  {
  nomSociété: string;
  codePostal: string;
  ville: string;
  siret: string;
  secteur: string;
  taille: string;
  prénom: string;
  nom: string;
  email: string;
  travail: string;
  téléphone: string;
}

