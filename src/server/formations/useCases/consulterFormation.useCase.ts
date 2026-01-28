import { Either, isFailure } from '~/server/errors/either';
import { Formation, FormationFiltreAvecCodeCertification } from '~/server/formations/domain/formation';
import { FormationRepository } from '~/server/formations/domain/formation.repository';
import { Statistique } from '~/server/formations/domain/statistique';
import { StatistiqueRepository } from '~/server/formations/domain/statistique.repository';

export class ConsulterFormationUseCase {
	constructor(private formationRepository: FormationRepository, private statistiqueRepository: StatistiqueRepository) {}

	async handle(id: string, filtre?: FormationFiltreAvecCodeCertification): Promise<{ formation: Either<Formation>, statistiques?: Either<Statistique> }> {
		const formation = await this.formationRepository.get(id, filtre);

		if (isFailure(formation)) return { formation };

		const { longitude, latitude } = formation.result.adresse;
		const isMissingInfosToGetStatistics = !filtre?.codeCertification || !longitude || !latitude;
		if (isMissingInfosToGetStatistics) return { formation };

		const statistiques = await this.statistiqueRepository.get(filtre.codeCertification!, longitude, latitude);

		if (isFailure(statistiques)) return { formation };

		return { formation, statistiques };
	}
}
