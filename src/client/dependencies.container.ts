import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { MétierRecherchéService } from '~/client/services/alternances/métierRecherché.service';
import { HttpClientService } from '~/client/services/httpClient.service';
import { LocalisationService } from '~/client/services/localisation.service';
import { LoggerService } from '~/client/services/logger.service';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

export type Dependency = Dependencies[keyof Dependencies];
export type Dependencies = {
  localisationService: LocalisationService
  offreEmploiService: OffreEmploiService
  alternanceService: AlternanceService
  métierRecherchéService: MétierRecherchéService
  missionEngagementService: MissionEngagementService
}

export default function dependenciesContainer(sessionId: string): Dependencies {
  const loggerService = new LoggerService(sessionId);
  const httpClientService =  new HttpClientService(sessionId, loggerService);
  const offreEmploiService = new OffreEmploiService(httpClientService);
  const localisationService = new LocalisationService(httpClientService);
  const alternanceService = new AlternanceService(httpClientService);
  const métierRecherchéService = new MétierRecherchéService(httpClientService);
  const missionEngagementService = new MissionEngagementService(httpClientService);

  return {
    alternanceService,
    localisationService,
    missionEngagementService,
    métierRecherchéService,
    offreEmploiService,
  };
}
