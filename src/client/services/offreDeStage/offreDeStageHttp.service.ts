import { AxiosInstance } from 'axios';

import {
  OffreDeStageAttributesFromCMS,
  OffreDeStageInternalService,
} from '~/client/components/features/OffreDeStage/OffreDeStage.type';

export class OffreDeStageHttpService {
  constructor(private http: AxiosInstance) {
  }
  
  async get(id: string): Promise<OffreDeStageAttributesFromCMS> {
    const response = await this.http.get<OffreDeStageInternalService>(`slugify/slugs/offre-de-stage/${id}`);
    return response.data.data.attributes;
  }
}
