import { aFicheMetierResult, aFicheMetierResultHttp } from '@tests/fixtures/domain/ficheMetier.fixture';
// eslint-disable-next-line import/named
import { MeiliSearch, MeiliSearchApiError, MeiliSearchErrorInfo } from 'meilisearch';

import { Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { FicheMetierFiltresRecherche, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';
import {
  FicheMetierMeilisearchRepository,
} from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.repository';

const filtresRecherche: FicheMetierFiltresRecherche = {
  motCle: 'mot clé',
  numberOfResult: 10,
  page: 1,
};

describe('FicheMetierMeilisearchRepository', () => {
  describe('rechercher', () => {
    describe('Si la pagination et le nombre de résultat ne sont pas renseignés', () => {
      let client: MeiliSearch;
      let repository: FicheMetierMeilisearchRepository;
			
      beforeEach(() => {
		    client = {
			    index: jest.fn().mockReturnThis(),
			    search: jest.fn(),
		    } as unknown as MeiliSearch;
        repository = new FicheMetierMeilisearchRepository(client);
      });

	    it('appelle l\'endpoint fiche métier avec les paramètres de recherche', () => {
		    repository.rechercher(filtresRecherche);
		    expect(client.index).toHaveBeenCalledWith('fiche-metier');
		    expect(client.index('fiche-metier').search).toHaveBeenCalledWith(filtresRecherche.motCle, {
			    attributesToRetrieve: ['id', 'nom_metier', 'accroche_metier'],
			    limit: filtresRecherche.numberOfResult,
			    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			    offset: (filtresRecherche.page! - 1) * filtresRecherche.numberOfResult!,
		    });
	    });
      describe('Lorsque l\'appel retourne un résultat', () => {
		    it('retourne une liste de fiches métiers', async () => {
			    client.index('fiche-metier').search = jest.fn().mockResolvedValue(aFicheMetierResultHttp());
			    const response = await repository.rechercher(filtresRecherche) as Success<FicheMétierResult>;
          expect(response.result).toEqual(aFicheMetierResult());
		    });
      });
	    describe('Lorsque l\'appel échoue car la demande est invalide', () => {
		    it('retourne une erreur requête invalide', async () => {
			    const errorInfo: MeiliSearchErrorInfo = { code: '', link: '', message: '', type: 'invalid_request' };
			    const error = new MeiliSearchApiError(errorInfo, 404);
			    client.index('fiche-metier').search = jest.fn().mockRejectedValue(error);
			    const response = await repository.rechercher(filtresRecherche) as Failure;
			    expect(response.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
		    });
	    });
      describe('Lorsque l\'appel échoue pour toute autre raison', () => {
	      it('retourne une erreur service indisponible', async () => {
		      client.index('fiche-metier').search = jest.fn().mockRejectedValue(new Error());
		      const response = await repository.rechercher(filtresRecherche) as Failure;
		      expect(response.errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
	      });
      });
    });
  });
});
