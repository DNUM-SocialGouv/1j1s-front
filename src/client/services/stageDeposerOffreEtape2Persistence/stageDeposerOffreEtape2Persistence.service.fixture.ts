import { StageDeposerOffreEtape2PersistenceService } from './stageDeposerOffreEtape2Persistence.service';

export function aStageDeposerOffreEtape2PersistenceService(override?: Partial<StageDeposerOffreEtape2PersistenceService>): StageDeposerOffreEtape2PersistenceService {
	return {
		getInformationsEtape2: jest.fn(),
		removeInformationsEtape2: jest.fn(),
		setInformationsEtape2: jest.fn(),
		...override,
	};
}
