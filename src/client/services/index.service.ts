import axios from 'axios';

import { AnnonceDeLogementHttpService } from '~/client/services/annonceDeLogement/annonceDeLogementHttp.service';
import { AnnonceDeLogementService } from '~/client/services/annonceDeLogement/AnnonceDeLogementService.type';
import { OffreDeStageHttpService } from '~/client/services/offreDeStage/offreDeStageHttp.service';
import { OffreDeStageService } from '~/client/services/offreDeStage/OffreDeStageService.type';

export type IndexServices = {
  offreDeStage: OffreDeStageService;
	annonceDeLogement: AnnonceDeLogementService
}

// Déclaration des http Clients
const STAGE_CONTENT_MANAGER_BASE_URL = process.env.NEXT_PUBLIC_STAGE_CONTENT_MANAGER_BASE_URL;
const secondStrapiInstance = axios.create({ baseURL: STAGE_CONTENT_MANAGER_BASE_URL+'/api' });

const indexServices: IndexServices = {
	annonceDeLogement: new AnnonceDeLogementHttpService(secondStrapiInstance),
	offreDeStage: new OffreDeStageHttpService(secondStrapiInstance),
};

export default indexServices;
