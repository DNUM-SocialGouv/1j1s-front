import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';

import {
  LesEntreprisesSEngagentService,
} from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { createSuccess } from '~/server/errors/either';

describe('LesEntreprisesSEngagentService', () => {
  it('appelle l’api avec le formulaire', async () => {
    const httpClientService = aHttpClientService();
    const lesEntreprisesSEngagentServiceService = new LesEntreprisesSEngagentService(httpClientService);

    const result = await lesEntreprisesSEngagentServiceService.envoyerFormulaireEngagement({
      codePostal: '',
      email: '',
      nom: '',
      nomSociété: '',
      prénom: '',
      secteur: '',
      siret: '',
      taille: '',
      travail: '',
      téléphone: '',
    });

    expect(result).toEqual(createSuccess(undefined));
  });
});
