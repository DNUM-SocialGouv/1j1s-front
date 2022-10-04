import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import {
  NOMBRE_RÉSULTATS_OFFRE_EMPLOI_PAR_PAGE,
  OffreEmploi,
  OffreEmploiFiltre,
  OffreEmploiId,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';
import {
  mapOffreEmploi,
  mapRésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploi.mapper';
import {
  OffreEmploiResponse,
  RésultatsRechercheOffreEmploiResponse,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification,
    private apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
    private cacheService: CacheService,
  ) {}

  private MAX_AUTHORIZED_RANGE = 1000;
  private CACHE_KEY = 'ECHANTILLON_OFFRE_EMPLOI';
  private CACHE_KEY_JOB_ETUDIANT = 'ECHANTILLON_JOB_ETUDIANT';

  async getOffreEmploi(id: OffreEmploiId): Promise<Either<OffreEmploi>> {
    return await this.httpClientServiceWithAuthentification.get<OffreEmploiResponse, OffreEmploi>(
      `/${id}`,
      mapOffreEmploi,
    );
  }

  async searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<Either<RésultatsRechercheOffreEmploi>> {
    const paramètresRecherche = await this.buildParamètresRecherche(offreEmploiFiltre);
    if(paramètresRecherche) {
      return await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreEmploiResponse, RésultatsRechercheOffreEmploi>(
        `/search?${paramètresRecherche}`,
        mapRésultatsRechercheOffreEmploi,
      );
    }
    return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
  }

  async buildParamètresRecherche(offreEmploiFiltre: OffreEmploiFiltre): Promise<string | undefined> {
    if((offreEmploiFiltre.page * NOMBRE_RÉSULTATS_OFFRE_EMPLOI_PAR_PAGE - 1) > this.MAX_AUTHORIZED_RANGE) {
      return undefined;
    }
    const range = `${(offreEmploiFiltre.page - 1) * NOMBRE_RÉSULTATS_OFFRE_EMPLOI_PAR_PAGE}-${offreEmploiFiltre.page * NOMBRE_RÉSULTATS_OFFRE_EMPLOI_PAR_PAGE - 1}`;

    const localisation = await this.buildParamètreLocalisation(offreEmploiFiltre);

    function mapTempsDeTravail() {
      if (offreEmploiFiltre.tempsDeTravail === 'tempsPlein') return 'true';
      if (offreEmploiFiltre.tempsDeTravail === 'tempsPartiel') return 'false';
      return '';
    }

    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      experienceExigence: offreEmploiFiltre.experienceExigence,
      grandDomaine: offreEmploiFiltre.grandDomaineList.join(','),
      motsCles: offreEmploiFiltre.motClé || '',
      range,
      tempsPlein: mapTempsDeTravail(),
      typeContrat: offreEmploiFiltre.typeDeContratList.join(','),
      ...localisation,
      dureeHebdoMax: offreEmploiFiltre.dureeHebdoMax,
    };

    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }

  private async buildParamètreLocalisation(offreEmploiFiltre: OffreEmploiFiltre) {
    if (offreEmploiFiltre.localisation) {
      const typeLocalisation = offreEmploiFiltre.localisation.type;
      if (typeLocalisation === TypeLocalisation.REGION) {
        return { region: offreEmploiFiltre.localisation.code };
      } else if (typeLocalisation === TypeLocalisation.DEPARTEMENT) {
        return { departement: offreEmploiFiltre.localisation.code };
      } else if (typeLocalisation === TypeLocalisation.COMMUNE) {
        const codeInseeInRéférentiel = await this.apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune(offreEmploiFiltre.localisation.code);
        return { commune: codeInseeInRéférentiel };
      }
    } else {
      return undefined;
    }
  }

  async getSampleOffreEmploi(isJobEtudiant: boolean): Promise<Either<RésultatsRechercheOffreEmploi>>  {
    const responseInCache = await this.cacheService.get<RésultatsRechercheOffreEmploiResponse>(isJobEtudiant ? this.CACHE_KEY_JOB_ETUDIANT : this.CACHE_KEY);

    if (responseInCache) return createSuccess(mapRésultatsRechercheOffreEmploi(responseInCache));
    else {

      const response =  await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreEmploiResponse, RésultatsRechercheOffreEmploiResponse>(
        `/search?range=0-14${isJobEtudiant ? '&dureeHebdoMax=1600&tempsPlein=false&typeContrat=CDD,MIS,SAI' : ''}`,
        (data) => data,
      );
      switch (response.instance) {
        case 'success': {
          this.cacheService.set(isJobEtudiant ? this.CACHE_KEY_JOB_ETUDIANT : this.CACHE_KEY, response.result, 6);
          return createSuccess(mapRésultatsRechercheOffreEmploi(response.result));
        }
        case 'failure': return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
      }
    }
  }
}
