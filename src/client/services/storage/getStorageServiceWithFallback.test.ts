import { getStorageServiceWithFallback } from '~/client/services/storage/getStorageServiceWithFallback';
import { StorageService } from '~/client/services/storage/storage.service';

describe('getStorageServiceWithFallback()', () => {
	it('appelle le fallback quand le service par défaut n’est pas disponible', () => {
		const defaultService: StorageService = {
			get() { throw new Error(); },
			remove() { throw new Error(); },
			set() { throw new Error(); },
		};
		const fallbackService: StorageService = {
			get: jest.fn().mockReturnValue('value'),
			remove: jest.fn(),
			set: jest.fn(),
		};
		const mergedService = getStorageServiceWithFallback(defaultService, fallbackService);

		const value = mergedService.get('key');
		mergedService.set('key', 'value');
		mergedService.remove('key');

		expect(fallbackService.get).toHaveBeenCalledWith('key');
		expect(value).toBe('value');
		expect(fallbackService.set).toHaveBeenCalledWith('key', 'value');
		expect(fallbackService.remove).toHaveBeenCalledWith('key');
	});
	it('appelle le service par défaut quand il est disponible', () => {
		const defaultService: StorageService = {
			get: jest.fn().mockReturnValue('value'),
			remove: jest.fn(),
			set: jest.fn(),
		};
		const fallbackService: StorageService = {
			get: jest.fn().mockReturnValue('fallback value'),
			remove: jest.fn(),
			set: jest.fn(),
		};
		const mergedService = getStorageServiceWithFallback(defaultService, fallbackService);

		const value = mergedService.get('key');
		mergedService.set('key', 'value');
		mergedService.remove('key');

		expect(defaultService.get).toHaveBeenCalled();
		expect(value).toBe('value');
		expect(defaultService.set).toHaveBeenCalled();
		expect(defaultService.remove).toHaveBeenCalled();
	});
	it('n’appelle pas le fallback quand le service par défaut est disponible', () => {
		const defaultService: StorageService = {
			get: jest.fn().mockReturnValue('value'),
			remove: jest.fn(),
			set: jest.fn(),
		};
		const fallbackService: StorageService = {
			get: jest.fn().mockReturnValue('fallback value'),
			remove: jest.fn(),
			set: jest.fn(),
		};
		const mergedService = getStorageServiceWithFallback(defaultService, fallbackService);

		const value = mergedService.get('key');
		mergedService.set('key', 'value');
		mergedService.remove('key');

		expect(fallbackService.get).not.toHaveBeenCalled();
		expect(value).toBe('value');
		expect(fallbackService.set).not.toHaveBeenCalled();
		expect(fallbackService.remove).not.toHaveBeenCalled();
	});
});
