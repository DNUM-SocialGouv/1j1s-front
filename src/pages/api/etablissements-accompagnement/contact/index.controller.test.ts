import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
  demandeContactAccompagnementBodySchema,
  envoyerDemandeContactAccompagnementHandler,
} from '~/pages/api/etablissements-accompagnement/contact/index.controller';
import { aTipimailDemandeDeContactRequest } from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.fixture';
import { TipimailDemandeDeContactRequest } from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.request';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('envoyer une demande de contact', () => {
  describe('lorsque le body est valide', () => {
    it('retourne un status 200', async () => {
      let tipimailDemandeDeContact: TipimailDemandeDeContactRequest;
      const expectedBody = aTipimailDemandeDeContactRequest();
      nock('https://api.tipimail.com/v1')
        .post('/messages/send', (body) => { tipimailDemandeDeContact = body; return true; })
        .reply(200);
      
      await testApiHandler<void | ErrorHttpResponse>({
        handler: (req, res) => envoyerDemandeContactAccompagnementHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({
            body: JSON.stringify({
              age: '23',
              codeCommune: '75056',
              commentaire: 'Merci de me recontacter',
              email: 'john.doe@email.com',
              nom: 'Doe',
              nomCommune: 'Paris',
              prénom: 'John',
              téléphone: '0606060606',
              établissement: {
                email: 'email@email.com',
                nom: 'Mission locale pour l\'insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements',
                type: 'mission_locale',
              },
            }),
            headers: {
              'content-type': 'application/json',
            },
            method: 'POST',
          });

          expect(res.status).toEqual(200);
          expect(tipimailDemandeDeContact).toEqual(expectedBody);
        },
        url: '/etablissements-accompagnement/contact',
      });
    });
  });

  describe('lorsque le body est invalide', () => {
    it('retourne un status 400', async () => {
      const body = {
        age: '23',
        codeCommune: '75056',
        commentaire: 'Merci de me recontacter',
        email: 'john.doe@email.com',
        nom: 'Doe',
        nomCommune: 'Paris',
        prénom: 'John',
        téléphone: '0606060606',
        établissement: {
          email: 'email@email.com',
          nom: 'Mission locale pour l\'insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements',
          type: 'mairie',
        },
      };
      const result = demandeContactAccompagnementBodySchema.validate(body);

      expect(result.error?.name).toEqual('ValidationError');
      expect(result.error?.message).toEqual('"établissement.type" must be one of [cij, mission_locale, pole_emploi]');
    });
  });
});
