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
	it('devrait parser la donnée renvoyée quand on get()', () => {
		const expectedData = { test: 'value' };
		const storage = aStorage({
			getItem: jest.fn().mockReturnValue(JSON.stringify(expectedData)),
		});
		const service = new BrowserStorageService(storage);

		const result = service.get('key');

		expect(result).toEqual(expectedData);
	});
	it('devrait serialiser la donnée quand on set()', () => {
		const data = { test: 'value' };
		const storage = aStorage();
		const service = new BrowserStorageService(storage);

		service.set('key', data);

		expect(storage.setItem).toHaveBeenCalledWith('key', JSON.stringify(data));
	});
});
