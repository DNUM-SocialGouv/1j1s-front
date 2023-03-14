/**
 * @jest-environment jsdom
 */

import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { StageService } from '~/client/services/stage/stage.service';
import {
	aFormulaireEnvoyéPostedValue,
	aFormulaireÉtapeEntreprise,
	aFormulaireÉtapeLocalisation,
	aFormulaireÉtapeStage,
} from '~/client/components/features/OffreDeStage/FormulaireDeposerOffre/FormulaireDeposerOffreDeStage.fixture';
import { createSuccess } from '~/server/errors/either';

describe('stageService', () => {
	describe('enregistrerOffreStage', () => {
		it('enregistre l’offre de stage', async () => {
			// GIVEN
			const httpClient = anHttpClientService();
			jest.spyOn(httpClient, 'post').mockResolvedValue(createSuccess(undefined));
			const offreToSubmit = aFormulaireEnvoyéPostedValue();
			const stageService = new StageService(httpClient);

			// WHEN
			const result = await stageService.enregistrerOffreDeStage(aFormulaireÉtapeEntreprise(), aFormulaireÉtapeStage(), aFormulaireÉtapeLocalisation());

			// THEN
			expect(httpClient.post).toHaveBeenCalledWith('stages', offreToSubmit);
			expect(result).toEqual({ instance: 'success' });
		});
	});
});
