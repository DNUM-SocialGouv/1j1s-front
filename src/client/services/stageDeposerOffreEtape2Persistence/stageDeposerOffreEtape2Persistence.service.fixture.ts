import { StageDeposerOffreEtape2PersistenceService } from './stageDeposerOffreEtape2Persistence.service';

export function aStageDeposerOffreEtape2PersistenceService(override?: Partial<StageDeposerOffreEtape2PersistenceService>): StageDeposerOffreEtape2PersistenceService {
	return {
		getInformationsEtape2: vi.fn(),
		removeInformationsEtape2: vi.fn(),
		setInformationsEtape2: vi.fn(),
		...override,
	};
}
