// @vitest-environment node
import {
	getApiTrajectoiresProConfig,
} from '~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProHttpClient.config';
import {
	ApiTrajectoiresProTokenAgent,
} from '~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProTokenAgent';
import { ConfigurationServiceFixture } from '~/server/services/configuration.service.fixture';

vi.mock('~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProTokenAgent', () => ({
	ApiTrajectoiresProTokenAgent: vi.fn(),
}));

const contextPath = 'https://omogen-api-pr.phm.education.gouv.fr/exposition-inserjeunes-insersup';

describe('getApiTrajectoiresProConfig', () => {
	beforeEach(() => {
		vi.mocked(ApiTrajectoiresProTokenAgent).mockClear();
	});

	describe('quand la variable API_TRAJECTOIRES_PRO_URL porte un slash final', () => {
		it('construit une URL d’authentification sans double slash', () => {
			// GIVEN
			const configurationService = new ConfigurationServiceFixture({
				API_TRAJECTOIRES_PRO_URL: `${contextPath}/`,
			});

			// WHEN
			getApiTrajectoiresProConfig(configurationService);

			// THEN
			expect(ApiTrajectoiresProTokenAgent).toHaveBeenCalledWith(
				`${contextPath}/auth/token`,
				'client-id',
				'client-secret',
				'api-key',
			);
		});

		it('laisse l’URL des données inchangée', () => {
			// GIVEN
			const configurationService = new ConfigurationServiceFixture({
				API_TRAJECTOIRES_PRO_URL: `${contextPath}/`,
			});

			// WHEN
			const config = getApiTrajectoiresProConfig(configurationService);

			// THEN
			expect(config.apiUrl).toBe(`${contextPath}/`);
		});
	});

	describe('quand la variable API_TRAJECTOIRES_PRO_URL ne porte pas de slash final', () => {
		it('construit la même URL d’authentification', () => {
			// GIVEN
			const configurationService = new ConfigurationServiceFixture({
				API_TRAJECTOIRES_PRO_URL: contextPath,
			});

			// WHEN
			getApiTrajectoiresProConfig(configurationService);

			// THEN
			expect(ApiTrajectoiresProTokenAgent).toHaveBeenCalledWith(
				`${contextPath}/auth/token`,
				'client-id',
				'client-secret',
				'api-key',
			);
		});

		it('laisse l’URL des données inchangée', () => {
			// GIVEN
			const configurationService = new ConfigurationServiceFixture({
				API_TRAJECTOIRES_PRO_URL: contextPath,
			});

			// WHEN
			const config = getApiTrajectoiresProConfig(configurationService);

			// THEN
			expect(config.apiUrl).toBe(contextPath);
		});
	});
});
