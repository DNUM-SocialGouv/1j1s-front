import { uneEntreprise, uneEntrepriseMember } from '@tests/fixtures/client/services/lesEntreprisesSEngagementService.fixture';
import nock from 'nock';

import { ApiRejoindreLaMobilisationRepository } from '~/server/entreprises/infra/ApiRejoindreLaMobilisation.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClient.service';

describe('ApiRejoindreLaMobilisationRepository', () => {
  const entrepriseApiUrl = 'https://lesentreprisesengagent.france';
  afterEach(() => {
    nock.cleanAll();
  });
  describe('.save', () => {
    let repository: ApiRejoindreLaMobilisationRepository;
    beforeEach(() => {
      const client = new HttpClientService({
        apiName: 'test LEE',
        apiUrl: entrepriseApiUrl,
      });
      repository = new ApiRejoindreLaMobilisationRepository(client);
    });
    it('envoie un POST vers l\'API des entreprise s\'engagent', async () => {
      // Given
      let capturedBody: Record<string, any>;
      const api = nock(entrepriseApiUrl)
        .post('/api/members', (b) => {capturedBody = b; return true;})
        .reply(201, {});
      const entreprise = uneEntreprise();
      // When
      const actual = await repository.save(entreprise);
      // Then
      expect(actual).toEqual(createSuccess(undefined));
      expect(api.isDone()).toEqual(true);
      expect(capturedBody!).toEqual(uneEntrepriseMember());
    });
    it('résoud une erreur quand le service est indisponible', async () => {
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
    it('résoud une erreur quand les données sont invalides', async () => {
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
    it('résoud une erreur quand l\'entreprise est déjà engagée', async () => {
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
    it('résoud une erreur quand il y a une erreur réseau', async () => {
      // Given
      const entreprise = uneEntreprise();
      // When
      const actual = await repository.save(entreprise);
      // Then
      expect(actual).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
    });
  });
});
