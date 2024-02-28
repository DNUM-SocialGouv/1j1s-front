/**
 * @jest-environment jsdom
 */

import { mockSessionStorage } from '~/client/components/window.mock';
import {
	SessionStorageBackButtonPersistenceService,
} from '~/client/services/backButtonPersistence/sessionStorage.backButtonPersistence.service';

describe('SessionStorageBackButtonPersistenceService', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});
	describe('setPreviousPath', () => {
		it('définit le chemin précédent dans le stockage de session', () => {
			// Given
			mockSessionStorage({
				setItem: jest.fn(),
			});
			const service = new SessionStorageBackButtonPersistenceService();
			const path = '/previous/page';

			// When
			service.setPreviousPath(path);

			// Then
			expect(sessionStorage.setItem).toHaveBeenCalledWith('previousPath', path);
		});
	});

	describe('getPreviousPath', () => {
		it('récupère le chemin précédent depuis le stockage de session', () => {
			// Given
			mockSessionStorage({
				getItem: jest.fn(),
			});
			const service = new SessionStorageBackButtonPersistenceService();

			// When
			service.getPreviousPath();

			// Then
			expect(sessionStorage.getItem).toHaveBeenCalledWith('previousPath');
		});
	});

	describe('setCurrentPath', () => {
		it('définit le chemin courant dans le stockage de session', () => {
			// Given
			mockSessionStorage({
				setItem: jest.fn(),
			});
			const service = new SessionStorageBackButtonPersistenceService();
			const path = '/current/page';

			// When
			service.setCurrentPath(path);

			// Then
			expect(sessionStorage.setItem).toHaveBeenCalledWith('currentPath', path);
		});
	});

	describe('getCurrentPath', () => {
		it('récupère le chemin courant depuis le stockage de session', () => {
			// Given
			mockSessionStorage({
				getItem: jest.fn(),
			});
			const service = new SessionStorageBackButtonPersistenceService();

			// When
			service.getCurrentPath();

			// Then
			expect(sessionStorage.getItem).toHaveBeenCalledWith('currentPath');
		});
	});
});
