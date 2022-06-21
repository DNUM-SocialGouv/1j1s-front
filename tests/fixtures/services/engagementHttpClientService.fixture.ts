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
    activity: '',
    adresse: ', 78300 Poissy',
    applicationUrl: 'https://api.api-engagement.beta.gouv.fr/r/6278e8ced7dda60703c3ca40/5fa438777a2fa04fc30aeaa6',
    associationId: 'e111e632-879c-4707-a9d9-822eeef5aa17',
    associationName: 'Ebs le relais val de seine',
    associationRNA: 'W783001873',
    associationReseaux: [
      'Emmaüs France',
    ],
    associationSiren: null,
    associationSources: [
      'Je veux aider',
    ],
    audience: [],
    city: 'Poissy',
    clientId: '21552',
    country: 'FR',
    createdAt: '2022-05-09T10:11:26.868Z',
    departmentCode: '78',
    departmentName: 'Yvelines',
    description: ' • Faire connaître les activités du Relais et inciter au don de textiles dans\n   votre quartier \n • Prévenir en cas de débordement ou de dégradation constatés d’une borne\n • Sensibiliser vos voisins \n • Participer à des évènements de collecte de collecte à proximité de son\n   domicile\n\n\\n\\nObjectifs: \\n\n\nNous désirons innover en développant un réseau d’ambassadeurs bénévoles autour\ndu geste du don dans la ville de Poissy, chaque ambassadeur se voyant assigné un\npoint de collecte - « une borne » - à proximité de son domicile et pouvant par\nla suite organiser des animations autour de la réduction des déchets et du tri\ndes textiles. ',
    domain: 'solidarite-insertion',
    domainLogo: 'https://jeveuxaider.fra1.digitaloceanspaces.com/public/production/12166/solidarite-et-insertion-2.webp',
    endAt: '2022-10-09T00:00:00.000Z',
    id: '6278e8ced7dda60703c3ca40',
    location: {
      lat: 48.930286,
      lon: 2.033494,
    },
    metadata:'',
    organizationCity: 'Chanteloup-les-Vignes',
    organizationFullAddress: '10 Rue Panhard Levassor, 78570 Chanteloup-les-Vignes, France',
    organizationName: 'EBS Le Relais Val De Seine',
    organizationPostCode: '78570',
    organizationStatusJuridique: 'Association',
    organizationUrl: 'https://www.jeveuxaider.gouv.fr/organisations/12243-ebs-le-relais-val-de-seine',
    places: 13,
    postalCode: '78300',
    postedAt: '2022-05-05T16:38:07.000Z',
    priority: '',
    publisherId: '5f5931496c7ea514150a818f',
    publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f5931496c7ea514150a818f/logo_JVA_gouv_carre_light.png',
    publisherName: 'Je veux aider',
    publisherUrl: 'https://www.jeveuxaider.gouv.fr/',
    region: 'Île-de-France',
    remote: 'no',
    soft_skills: [],
    startAt: '2022-05-09T00:00:00.000Z',
    tasks: [],
    title: 'Je deviens Ambassadeur du don des vêtements',
    updatedAt: '2022-06-13T15:12:46.266Z',
  };
}

function aSoutienAuxEnfantsEttAuxJeunesMissionResponse(): MissionEngagementResponse {
  return {
    activity:'',
    adresse: 'Rueil-Malmaison, 92500 Rueil-Malmaison',
    applicationUrl: 'https://api.api-engagement.beta.gouv.fr/r/61aaf6d48028f7075b9dd472/5fa438777a2fa04fc30aeaa6',
    associationId: '33c3ecf8-ca77-474f-8555-14979448f041',
    associationName: 'Pass-Age',
    associationRNA: 'W922001607',
    associationReseaux: [],
    associationSiren: '',
    associationSources: [
      'Je veux aider',
      'Benevolt',
      'RNA',
    ],
    audience: [],
    city: 'Rueil-Malmaison',
    clientId: '15730',
    country: 'FR',
    createdAt: '2021-12-04T05:04:20.920Z',
    departmentCode: '92',
    departmentName: 'Hauts-de-Seine',
    description: 'Votre mission auprès de la personne accompagnée consiste à :\n\n • lui apporter une aide méthodologique dans ses devoirs  \n • la motiver, l’encourager à la persévérance scolaire \n • lui faire découvrir des ressources éducatives et culturelles \n • si l’enseignement est partiellement à distance, l’aider à accéder à ses\n   cours, à communiquer avec ses enseignants \n\n\\n\\nObjectifs: \\n\n\nCette mission de mentorat a pour but de  favoriser l’autonomie et le\ndéveloppement de la personne accompagnée en établissant des objectifs évolutifs\net adaptés à ses besoins spécifiques.',
    domain: 'education',
    domainLogo: 'https://jeveuxaider.fra1.digitaloceanspaces.com/public/production/8465/Gyr2tG6YLstfYJ0.jpg',
    id: '61aaf6d48028f7075b9dd472',
    location: {
      lat: 48.874602,
      lon: 2.180528,
    },
    metadata:'',
    organizationCity: 'Rueil-Malmaison',
    organizationFullAddress: 'Rueil-Malmaison, 92500 Rueil-Malmaison, France',
    organizationName: 'Pass-Age',
    organizationPostCode: '92500',
    organizationStatusJuridique: 'Association',
    organizationUrl: 'https://www.jeveuxaider.gouv.fr/organisations/4646-pass-age',
    places: 7,
    postalCode: '92500',
    postedAt: '2021-12-03T08:55:04.000Z',
    priority: '',
    publisherId: '5f5931496c7ea514150a818f',
    publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f5931496c7ea514150a818f/logo_JVA_gouv_carre_light.png',
    publisherName: 'Je veux aider',
    publisherUrl: 'https://www.jeveuxaider.gouv.fr/',
    region: 'Île-de-France',
    remote: 'no',
    soft_skills: [],
    startAt: '2022-01-01T16:45:00.000Z',
    tasks: [],
    title: 'J’apporte un soutien aux enfants et jeunes, notamment dans les quartiers populaires, les zones rurales et territoires fragiles',
    updatedAt: '2022-06-13T15:18:02.638Z',
  };
}



