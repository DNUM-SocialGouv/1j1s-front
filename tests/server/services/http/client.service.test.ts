import nock from 'nock';

import { Either, Failure, Success } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { ClientService } from '~/server/services/http/client.service';

class FakeHttpClientService extends ClientService {
  constructor() {
    super('apiName', 'http://baseUrl/');
  }

  get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
  ): Promise<Either<Retour>> {
    return super.getRequest(endpoint, mapper);
  }
}

interface FakeRéponse {
  a: string
  une_liste: string[]
}

interface FakeRésultat {
  titre: string
  étiquetteList: number[]
}

function mapper(réponse: FakeRéponse): FakeRésultat {
  return {
    titre: réponse.a,
    étiquetteList: réponse.une_liste.map(Number),
  };
}

describe('ClientService', () => {
  const clientService = new FakeHttpClientService();

  it('retourne un success quand le endpoint répond 200', async () => {
    nock('http://baseUrl/')
      .get('/endpoint')
      .reply(200, { a: 'un titre en fait', une_liste: [] });

    const result = await clientService.get<FakeRéponse, FakeRésultat>('endpoint', mapper);

    expect((result as unknown as Success<FakeRésultat>).result).toEqual({
      titre: 'un titre en fait',
      étiquetteList: [],
    });
  });

  it('retourne une failure CONTENU_INDISPONIBLE quand le endpoint répond 204', async () => {
    nock('http://baseUrl/')
      .get('/endpoint')
      .reply(204, {});

    const result = await clientService.get<FakeRéponse, FakeRésultat>('endpoint', mapper);

    expect((result as Failure).errorType).toEqual(ErrorType.CONTENU_INDISPONIBLE);
  });

  it('retourne une failure ERREUR_INATTENDUE quand le endpoint répond 200 avec un body vide', async () => {
    nock('http://baseUrl/')
      .get('/endpoint')
      .reply(200);

    const result = await clientService.get<FakeRéponse, FakeRésultat>('endpoint', mapper);

    expect((result as Failure).errorType).toEqual(ErrorType.CONTENU_INDISPONIBLE);
  });

  it('retourne une failure SERVICE_INDISPONIBLE quand le endpoint répond 500', async () => {
    nock('http://baseUrl/')
      .get('/endpoint')
      .reply(500);

    const result = await clientService.get<FakeRéponse, FakeRésultat>('endpoint', mapper);

    expect((result as Failure).errorType).toEqual(ErrorType.SERVICE_INDISPONIBLE);
  });

  it('retourne une failure DEMANDE_INCORRECTE quand le endpoint répond 400', async () => {
    nock('http://baseUrl/')
      .get('/endpoint')
      .reply(400);

    const result = await clientService.get<FakeRéponse, FakeRésultat>('endpoint', mapper);

    expect((result as Failure).errorType).toEqual(ErrorType.DEMANDE_INCORRECTE);
  });

  it('retourne une failure CONTENU_INDISPONIBLE quand le endpoint répond 404', async () => {
    nock('http://baseUrl/')
      .get('/endpoint')
      .reply(404);

    const result = await clientService.get<FakeRéponse, FakeRésultat>('endpoint', mapper);

    expect((result as Failure).errorType).toEqual(ErrorType.CONTENU_INDISPONIBLE);
  });

  it('retourne une failure CONTENU_INDISPONIBLE quand le mapping échoue', async () => {
    nock('http://baseUrl/')
      .get('/endpoint')
      .reply(200, { data: null });

    const result = await clientService.get<FakeRéponse, FakeRésultat>('endpoint', mapper);

    expect((result as Failure).errorType).toEqual(ErrorType.CONTENU_INDISPONIBLE);
  });
});
