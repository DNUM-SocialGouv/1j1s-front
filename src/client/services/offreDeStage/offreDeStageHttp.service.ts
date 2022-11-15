import { AxiosInstance } from 'axios';

import {
  OffreDeStageAttributesFromCMS,
  OffreDeStageDataFromCMS,
  OffreDeStageInternalService,
} from '~/client/components/features/OffreDeStage/OffreDeStage.type';

import { OffreDeStageService } from './OffreDeStageService.type';

const recupererSlugDepuisStage = (stage: OffreDeStageDataFromCMS): string => stage.attributes.slug;

export class OffreDeStageHttpService implements OffreDeStageService {

  constructor(private http: AxiosInstance) {
  }

  async get(id: string): Promise<OffreDeStageAttributesFromCMS> {
    const response = await this.http.get<OffreDeStageInternalService>(`slugify/slugs/offre-de-stage/${id}?populate=deep`);
    return response.data.data.attributes;
  }

  private async recupererSlugsDesStages(page: number) {
    const reponse = await this.http.get('offres-de-stage/?fields[]=slug&pagination[page]=' + page + '&pagination[pageSize]=255');
    return reponse
      .data.data
      .map(recupererSlugDepuisStage);
  }

  async listeTousLesSlugs(): Promise<Array<string>> {
    let slugs: string[] = [];
    let pageActuelle = 1;

    let nombreDeSlug = 0;
    do {
      nombreDeSlug = slugs.length;
      const results = await this.recupererSlugsDesStages(pageActuelle);
      slugs = slugs.concat(results);
      pageActuelle++;
    } while (nombreDeSlug !== slugs.length);

    return slugs;
  }
}
