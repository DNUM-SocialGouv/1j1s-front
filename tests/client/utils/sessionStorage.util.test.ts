/**
 * @jest-environment jsdom
 */
import StorageService from '~/client/utils/sessionStorage.util';

describe('StorageService', () => {
  describe('getItem', () => {
    it('retourne le session id du session storage', () => {
      StorageService.setItem(StorageService.Key.SESSION_ID, 'ma-session-id');
      expect(StorageService.getItem(StorageService.Key.SESSION_ID)).toEqual(
        'ma-session-id',
      );
    });
  });
});
