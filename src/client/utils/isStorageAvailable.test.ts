/**
 * @jest-environment jsdom
 */
import { mockLocalStorage } from '~/client/components/window.mock';
import { isStorageAvailable } from '~/client/utils/isStorageAvailable';

describe('isStorageAvailabe', () => {
 	const clear = jest.fn();
 	const getItem = jest.fn();
 	const removeItem = jest.fn();
 	const setItem = jest.fn();
	beforeEach(() => {
		mockLocalStorage({
			clear,
			getItem,
			removeItem,
			setItem,
		});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('retourne true quand le storage est disponible', () => {
		// Given
		mockLocalStorage({});

		// When Then
		expect(isStorageAvailable('localStorage')).toBeTruthy();
	});
	it('retourne false quand accéder au storage renvoie une erreur', () => {
		// Given
		clear.mockImplementation(() => {throw new Error();}),
		getItem.mockImplementation(() => {throw new Error();}),
		removeItem.mockImplementation(() => {throw new Error();}),
		setItem.mockImplementation(() => {throw new Error();}),

		// When Then
		expect(isStorageAvailable('localStorage')).toBeFalsy();
	});
});
