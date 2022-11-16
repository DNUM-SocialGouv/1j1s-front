import { AxiosInstance } from 'axios';

import {
  OffreDeStageAttributesFromCMS,
  OffreDeStageInternalService,
} from '~/client/components/features/OffreDeStage/OffreDeStage.type';

import { OffreDeStageService } from './OffreDeStageService.type';

export class OffreDeStageHttpService implements OffreDeStageService {

  constructor(private http: AxiosInstance) {
  }

  async get(id: string): Promise<OffreDeStageAttributesFromCMS> {
    const response = await this.http.get<OffreDeStageInternalService>(`slugify/slugs/offre-de-stage/${id}?populate=deep`);
    return response.data.data.attributes;
  }
}
