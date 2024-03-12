import { StageDeposerOffreEtape1PersistenceService } from './stageDeposerOffreEtape1Persistence.service';

export function aStageDeposerOffreEtape1PersistenceService(override?: Partial<StageDeposerOffreEtape1PersistenceService>): StageDeposerOffreEtape1PersistenceService {
	return {
		getInformationsEtape1: jest.fn(),
		setInformationsEtape1: jest.fn(),
		...override,
	};
}
