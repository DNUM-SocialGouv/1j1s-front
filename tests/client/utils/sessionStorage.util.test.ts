/**
 * @jest-environment jsdom
 */

import {
  getSessionStorage,
  SESSION_STORAGE_KEY,
  setSessionStorage,
} from '~/client/utils/sessionStorage.util';

describe('sessionStorage util', () => {
  describe('getItem', () => {
    it('retourne le session id du session storage', () => {
      setSessionStorage(SESSION_STORAGE_KEY.SESSION_ID, 'ma-session-id');
      expect(getSessionStorage(SESSION_STORAGE_KEY.SESSION_ID)).toEqual(
        'ma-session-id',
      );
    });
  });
});
