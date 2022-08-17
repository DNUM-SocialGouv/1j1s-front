import axios from 'axios';

import { OffreDeStageHttpService } from '~/client/services/offreDeStage/offreDeStageHttp.service';
import { OffreDeStageService } from '~/client/services/offreDeStage/OffreDeStageService.type';

export type IndexServices = {
  offreDeStage: OffreDeStageService;
}

// Déclaration des http Clients
const STAGE_CONTENT_MANAGER_BASE_URL = process.env.NEXT_PUBLIC_STAGE_CONTENT_MANAGER_BASE_URL;
const secondStrapiInstance = axios.create({ baseURL: STAGE_CONTENT_MANAGER_BASE_URL+'/api' });

const indexServices: IndexServices = {
  offreDeStage: new OffreDeStageHttpService(secondStrapiInstance),
};

export default indexServices;
