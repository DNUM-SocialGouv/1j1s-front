/**
 * @jest-environment jsdom
 */

import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { StageService } from '~/client/services/stage/stage.service';
import { anOffreDeStageDepot } from '~/client/services/stage/stageService.fixture';
import { createSuccess } from '~/server/errors/either';

describe('stageService', () => {
	describe('enregistrerOffreStage', () => {
		it('enregistre l’offre de stage', async () => {
			// GIVEN
			const httpClient = anHttpClientService();
			jest.spyOn(httpClient, 'post').mockResolvedValue(createSuccess(undefined));
			const offreToSubmit = anOffreDeStageDepot();
			const stageService = new StageService(httpClient);

			// WHEN
			const result = await stageService.enregistrerOffreDeStage(offreToSubmit);

			// THEN
			expect(httpClient.post).toHaveBeenCalledWith('stages', offreToSubmit);
			expect(result).toEqual({ instance: 'success' });
		});
	});
});
