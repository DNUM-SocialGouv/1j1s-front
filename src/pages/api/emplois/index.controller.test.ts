import { NextApiRequest } from 'next';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
  emploiFiltreMapper,
  emploisQuerySchema,
  rechercherOffreEmploiHandler,
} from '~/pages/api/emplois/index.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
import {
  aRésultatRechercheOffreEmploiAxiosResponse,
  aRésultatRéférentielCommuneResponse,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiHttpClientService.fixture';

describe('rechercher une offre d\'emploi', () => {
  it('retourne la liste des offres d\'emploi filtrée', async () => {
    nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres')
      .get('/search?range=0-14&motsCles=boulanger&typeContrat=CDD%2CCDI&commune=75101')
      .reply(401)
      .get('/search?range=0-14&motsCles=boulanger&typeContrat=CDD%2CCDI&commune=75101')
      .reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

    nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/referentiel')
      .get('/communes')
      .reply(200, aRésultatRéférentielCommuneResponse().data);

    nock('https://entreprise.pole-emploi.fr')
      .post('/connexion/oauth2/access_token?realm=partenaire')
      .reply(200, { access_token: 'fake_access_token' });

    await testApiHandler<RésultatsRechercheOffre | ErrorHttpResponse>({
      handler: (req, res) => rechercherOffreEmploiHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatsRechercheOffre());
      },
      url: '/emplois?motCle=boulanger&typeDeContrats=CDD,CDI&codeLocalisation=75101&typeLocalisation=COMMUNE&page=1',
    });
  });

  it('map la request parameters to EmploiFiltre', () => {
    const request: NextApiRequest = {
      query: {
        codeLocalisation: '75101',
        motCle: 'boulanger',
        page: '1',
        typeLocalisation: 'COMMUNE',
      },
    } as unknown as NextApiRequest;

    const result = emploiFiltreMapper(request);

    expect(result).toEqual({
      experienceExigence: undefined,
      grandDomaineList: undefined,
      localisation: {
        code: '75101',
        type: 'COMMUNE',
      },
      motClé: 'boulanger',
      page: 1,
      tempsDeTravail: undefined,
      typeDeContratList: undefined,
    });
  });

  describe('Quand les paramètres de l\'url ne respectent pas le schema de validation du controller', () => {
    it.each([
      { page: '67' },
      { page: '0' },
      { page: 'NaN' },
      { page: 'nan' },
      { page: '1', typeDeContrats: 'RSA' },
      { experienceExigence: 'A', page: '1' },
      { grandDomaine: 'CS12', page: '1' },
      { page: '1', tempsDeTravail: 'tiers' },
      { page: '1', typeLocalisation: 'erreur' },
      { codeLocalisation: 'erreur', page: '1', typeLocalisation: 'COMMUNE' },
    ])('pour %j on retourne une erreur', (queryParametersToTestInError) => {
      const result = emploisQuerySchema.validate(queryParametersToTestInError);

      expect(result.error).toBeDefined();
    });
  });

  describe('Quand les paramètres de l\'url respectent le schema de validation du controller', () => {
    it('on ne retourne pas d\'erreur', () => {
      const result = emploisQuerySchema.validate({ codeLocalisation:'2A004', page:'1', typeLocalisation:'COMMUNE' });

      expect(result.error).not.toBeDefined();
    });
  });
});
