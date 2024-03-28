import { StageDeposerOffreEtape3PersistenceService } from './stageDeposerOffreEtape3Persistence.service';

export function aStageDeposerOffreEtape3PersistenceService(override?: Partial<StageDeposerOffreEtape3PersistenceService>): StageDeposerOffreEtape3PersistenceService {
	return {
		getInformationsEtape3: jest.fn(),
		setInformationsEtape3: jest.fn(),
		...override,
	};
}
