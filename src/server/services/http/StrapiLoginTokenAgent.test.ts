import nock from 'nock';

import { StrapiLoginTokenAgent } from '~/server/services/http/StrapiLoginTokenAgent';

describe('StrapiLoginTokenAgent', () => {
  describe('getToken()', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('logs into the "local" auth strategy against strapi with login/password', async () => {
      // Given
      const strapiApiUrl = 'https://some.strapi.instance/api';
      const jwt = '23456789OKJHGTFCVBNJ';
      const user = { id: 1 };
      const login= 'website@1j1s.gouv.fr';
      const password= 'helloworld2022';
      nock(strapiApiUrl)
        .post('/auth/local', { identifier: login, password })
        .reply(200, { jwt, user });
      const agent = new StrapiLoginTokenAgent({
        apiUrl: strapiApiUrl, login, password,
      });
      // When
      const actual = await agent.getToken();
      // Then
      expect(actual).toEqual(jwt);
    });
  });
});

