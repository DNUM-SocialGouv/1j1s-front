import { BrowserStorage,BrowserStorageService } from './browser.storage.service';

function aStorage(overrides?: Partial<BrowserStorage>): BrowserStorage {
	return {
		getItem: jest.fn(),
		removeItem: jest.fn(),
		setItem: jest.fn(),
		...overrides,
	};
}

describe('browserStorageService', () => {
	it('parse la donnée renvoyée quand on get()', () => {
		const expectedData = { test: 'value' };
		const storage = aStorage({
			getItem: jest.fn().mockReturnValue(JSON.stringify(expectedData)),
		});
		const service = new BrowserStorageService(() => storage);

		const result = service.get('key');

		expect(result).toEqual(expectedData);
	});
	it('serialise la donnée quand on set()', () => {
		const data = { test: 'value' };
		const storage = aStorage();
		const service = new BrowserStorageService(() => storage);

		service.set('key', data);

		expect(storage.setItem).toHaveBeenCalledWith('key', JSON.stringify(data));
	});
	it('throw une erreur quand on get(), mais que le stockage n‘est pas disponible', () => {
		const storage = aStorage({
			getItem: jest.fn().mockImplementation(() => { throw new TypeError('getItem is not a function');}),
		});
		const service = new BrowserStorageService(() => storage);

		expect(() => service.get('key')).toThrow(new BrowserStorageService.StorageUnavailableError('storage unavailable'));
	});
	it('throw une erreur quand on set(), mais que le stockage n‘est pas disponible', () => {
		const storage = aStorage({
			setItem: jest.fn().mockImplementation(() => { throw new TypeError('setItem is not a function');}),
		});
		const service = new BrowserStorageService(() => storage);

		expect(() => service.set('key', 'value')).toThrow(new BrowserStorageService.StorageUnavailableError('storage unavailable'));
	});
	it('throw une erreur quand on remove(), mais que le stockage n‘est pas disponible', () => {
		const storage = aStorage({
			removeItem: jest.fn().mockImplementation(() => { throw new TypeError('removeItem is not a function');}),
		});
		const service = new BrowserStorageService(() => storage);

		expect(() => service.remove('key')).toThrow(new BrowserStorageService.StorageUnavailableError('storage unavailable'));
	});
	it('check la validité du stockage uniquement à l’utilisation', () => {
		let storage: BrowserStorage | null = null;
		// @ts-expect-error Test quand le storage est invalide
		const service = new BrowserStorageService(() => storage);
		storage = aStorage();

		expect(() => service.get('key')).not.toThrow();
		expect(() => service.set('key', 'value')).not.toThrow();
		expect(() => service.remove('key')).not.toThrow();
	});
});
