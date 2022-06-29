import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { aServeurIndisponibleError } from '@tests/fixtures/server/errors/errorResponse.fixture';
import {
  aRésultatRechercheOffreEmploiAxiosResponse,
  aRésultatRéférentielCommuneResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherJobÉtudiantHandler } from '~/pages/api/jobs-etudiants';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

describe('rechercher un job étudiant', () => {
  it('retourne la liste des jobs étudiants filtrée', async () => {
    nock('https://api.emploi-store.fr')
      .get('/partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&tempsPlein=false&typeContrat=CDD%2CMIS%2CSAI&commune=75101&dureeHebdoMax=1600')
      .reply(401)
      .get('/partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&tempsPlein=false&typeContrat=CDD%2CMIS%2CSAI&commune=75101&dureeHebdoMax=1600')
      .reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

    nock('https://api.emploi-store.fr')
      .get('/partenaire/offresdemploi/v2/referentiel/communes')
      .reply(200, aRésultatRéférentielCommuneResponse().data);

    nock('https://entreprise.pole-emploi.fr')
      .post('/connexion/oauth2/access_token?realm=partenaire')
      .reply(200, { access_token: 'fake_access_token' });

    await testApiHandler<RésultatsRechercheOffreEmploi | ErrorHttpResponse>({
      handler: (req, res) => rechercherJobÉtudiantHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatsRechercheOffreEmploi());
      },
      url: '/jobs-etudiants?motCle=boulanger&codeLocalisation=75001&typeLocalisation=COMMUNE&page=1',
    });
  });

  it('retourne une erreur 500 quand le service est indisponible', async () => {
    nock('https://api.emploi-store.fr')
      .get('/partenaire/offresdemploi/v2/offres/search?range=29970-29999&tempsPlein=false&typeContrat=CDD%2CMIS%2CSAI&dureeHebdoMax=1600')
      .reply(401)
      .get('/partenaire/offresdemploi/v2/offres/search?&range=29970-29999&tempsPlein=false&typeContrat=CDD%2CMIS%2CSAI&dureeHebdoMax=1600')
      .reply(500, aServeurIndisponibleError());

    nock('https://entreprise.pole-emploi.fr')
      .post('/connexion/oauth2/access_token?realm=partenaire')
      .reply(200, { access_token: 'fake_access_token' });

    await testApiHandler<RésultatsRechercheOffreEmploi | ErrorHttpResponse>({
      handler: (req, res) => rechercherJobÉtudiantHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(res.status).toEqual(500);
        expect(json).toEqual({ error: 'SERVICE_INDISPONIBLE' });
      },
      url: '/jobs-etudiants?page=1000',
    });
  });
});
