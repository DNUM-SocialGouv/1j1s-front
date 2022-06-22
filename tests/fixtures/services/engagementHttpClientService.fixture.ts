import {
  anAxiosInstance,
  anAxiosResponse,
} from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import {
  MissionEngagementResponse,
  RésultatsRechercheMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';

export function anEngagementHttpClientService(): EngagementHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as EngagementHttpClientService;
}

export function aRésultatRechercheMissionAxiosResponse(override?: Partial<RésultatsRechercheMissionEngagementResponse>): AxiosResponse<RésultatsRechercheMissionEngagementResponse> {
  return anAxiosResponse({
    hits: [
      anAmbassadeurDuDonDeVêtementMissionResponse(),
      aSoutienAuxEnfantsEttAuxJeunesMissionResponse(),
    ],
    total: 2,
    ...override,
  });
}

function anAmbassadeurDuDonDeVêtementMissionResponse(): MissionEngagementResponse {
  return {
    associationName: 'Ebs le relais val de seine',
    city: 'Poissy',
    clientId: '21552',
    description: ' • Faire connaître les activités du Relais et inciter au don de textiles dans\n   votre quartier \n • Prévenir en cas de débordement ou de dégradation constatés d’une borne\n • Sensibiliser vos voisins \n • Participer à des évènements de collecte de collecte à proximité de son\n   domicile\n\n\\n\\nObjectifs: \\n\n\nNous désirons innover en développant un réseau d’ambassadeurs bénévoles autour\ndu geste du don dans la ville de Poissy, chaque ambassadeur se voyant assigné un\npoint de collecte - « une borne » - à proximité de son domicile et pouvant par\nla suite organiser des animations autour de la réduction des déchets et du tri\ndes textiles. ',
    id: '6278e8ced7dda60703c3ca40',
    location: {
      lat: 48.930286,
      lon: 2.033494,
    },
    organizationName: 'EBS Le Relais Val De Seine',
    postalCode: '78300',
    publisherId: '5f5931496c7ea514150a818f',
    publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f5931496c7ea514150a818f/logo_JVA_gouv_carre_light.png',
    startAt: '2022-05-09T00:00:00.000Z',
    title: 'Je deviens Ambassadeur du don des vêtements',
  };
}

function aSoutienAuxEnfantsEttAuxJeunesMissionResponse(): MissionEngagementResponse {
  return {
    associationName: 'Pass-Age',
    city: 'Rueil-Malmaison',
    clientId: '15730',
    description: 'Votre mission auprès de la personne accompagnée consiste à :\n\n • lui apporter une aide méthodologique dans ses devoirs  \n • la motiver, l’encourager à la persévérance scolaire \n • lui faire découvrir des ressources éducatives et culturelles \n • si l’enseignement est partiellement à distance, l’aider à accéder à ses\n   cours, à communiquer avec ses enseignants \n\n\\n\\nObjectifs: \\n\n\nCette mission de mentorat a pour but de  favoriser l’autonomie et le\ndéveloppement de la personne accompagnée en établissant des objectifs évolutifs\net adaptés à ses besoins spécifiques.',
    id: '61aaf6d48028f7075b9dd472',
    location: {
      lat: 48.874602,
      lon: 2.180528,
    },
    organizationName: 'Pass-Age',
    postalCode: '92500',
    publisherId: '5f5931496c7ea514150a818f',
    publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f5931496c7ea514150a818f/logo_JVA_gouv_carre_light.png',
    startAt: '2022-01-01T16:45:00.000Z',
    title: 'J’apporte un soutien aux enfants et jeunes, notamment dans les quartiers populaires, les zones rurales et territoires fragiles',
  };
}



