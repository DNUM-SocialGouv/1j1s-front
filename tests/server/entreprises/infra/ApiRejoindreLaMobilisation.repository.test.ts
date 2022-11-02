import { uneEntreprise, uneEntrepriseMember } from '@tests/fixtures/client/services/lesEntreprisesSEngagentService.fixture';
import { Trap } from '@tests/fixtures/trap';
import nock from 'nock';

import { ApiRejoindreLaMobilisationRepository } from '~/server/entreprises/infra/ApiRejoindreLaMobilisation.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { OldHttpClientService } from '../../../../src/server/services/http/oldHttpClientService';

describe('ApiRejoindreLaMobilisationRepository', () => {
  const entrepriseApiUrl = 'https://lesentreprisesengagent.france';
  afterEach(() => {
    nock.cleanAll();
  });
  describe('.save', () => {
    let repository: ApiRejoindreLaMobilisationRepository;
    beforeEach(() => {
      const client = new OldHttpClientService({
        apiName: 'test LEE',
        apiUrl: entrepriseApiUrl,
      });
      repository = new ApiRejoindreLaMobilisationRepository(client);
    });
    it('envoie un POST vers l\'API des entreprise s\'engagent', async () => {
      // Given
      const trap = Trap<object>();
      const api = nock(entrepriseApiUrl)
        .post('/api/members', trap)
        .reply(201, {});
      const entreprise = uneEntreprise();
      // When
      const actual = await repository.save(entreprise);
      // Then
      expect(actual).toEqual(createSuccess(undefined));
      expect(api.isDone()).toEqual(true);
      expect(trap.value()).toEqual(uneEntrepriseMember());
    });
    it('résout une erreur quand le service est indisponible', async () => {
      // Given
      nock('https://lesentreprisesengagent.france')
        .post('/api/members')
        .reply(503, {});
      const entreprise = uneEntreprise();
      // When
      const actual = await repository.save(entreprise);
      // Then
      expect(actual).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
    });
    it('résout une erreur quand les données sont invalides', async () => {
      // Given
      nock('https://lesentreprisesengagent.france')
        .post('/api/members')
        .reply(400, {});
      const entreprise = uneEntreprise();
      // When
      const actual = await repository.save(entreprise);
      // Then
      expect(actual).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
    });
    it('résout une erreur quand l\'entreprise est déjà engagée', async () => {
      // Given
      nock('https://lesentreprisesengagent.france')
        .post('/api/members')
        .reply(409, {});
      const entreprise = uneEntreprise();
      // When
      const actual = await repository.save(entreprise);
      // Then
      expect(actual).toEqual(createFailure(ErreurMétier.CONFLIT_D_IDENTIFIANT));
    });
    it('résout une erreur quand il y a une erreur réseau', async () => {
      // Given
      const entreprise = uneEntreprise();
      // When
      const actual = await repository.save(entreprise);
      // Then
      expect(actual).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
    });
  });
});
