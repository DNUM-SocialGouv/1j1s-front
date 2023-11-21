/**
 * @jest-environment jsdom
 */

import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { BffStage3emeService } from '~/client/services/stage3eme/bff.stage3eme.service';

describe('BffStage3emeService', () => {
	describe('rechercherStage3eme', () => {
		it('appelle le endpoint', async () => {
			// Given
			const httpClientService = anHttpClientService();
			const bffStage3emeService = new BffStage3emeService(httpClientService);

			// When
			await bffStage3emeService.rechercherStage3eme();

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith('stages-3eme');
		});
	});
});
