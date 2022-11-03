import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosError } from 'axios';

import { RésultatsMissionEngagementResponse } from '~/server/engagement/infra/repositories/apiEngagement.response';

export function anAmbassadeurDuDonDeVêtementMissionResponse(): RésultatsMissionEngagementResponse {
  return {
    data: {
      _id: '6278e8ced7dda60703c3ca40',
      applicationUrl: 'https://api.api-engagement.beta.gouv.fr/r/6278e8ced7dda60703c3ca40/5fa438777a2fa04fc30aeaa6',
      associationName: 'Ebs le relais val de seine',
      city: 'Poissy',
      clientId: '21552',
      departmentCode: '78',
      departmentName: 'Yvelines',
      description: ' • Faire connaître les activités du Relais et inciter au don de textiles dans\n   votre quartier \n • Prévenir en cas de débordement ou de dégradation constatés d’une borne\n • Sensibiliser vos voisins \n • Participer à des évènements de collecte de collecte à proximité de son\n   domicile\n\n\\n\\nObjectifs: \\n\n\nNous désirons innover en développant un réseau d’ambassadeurs bénévoles autour\ndu geste du don dans la ville de Poissy, chaque ambassadeur se voyant assigné un\npoint de collecte - « une borne » - à proximité de son domicile et pouvant par\nla suite organiser des animations autour de la réduction des déchets et du tri\ndes textiles. ',
      duration: 5,
      location: {
        lat: 48.930286,
        lon: 2.033494,
      },
      organizationName: 'EBS Le Relais Val De Seine',
      postalCode: '78300',
      publisherId: '5f5931496c7ea514150a818f',
      publisherLogo: 'https://apicivique.cellar-c2.services.clever-cloud.com/app/publishers/5f5931496c7ea514150a818f/jeveuxaider%20api.png',
      region: 'Île-de-France',
      startAt: '2022-05-09T00:00:00.000Z',
      title: 'Je deviens Ambassadeur du don des vêtements',
    },
    ok: true,
  };
}

export function anInvalidIdMissionResponse(): Partial<AxiosError> {
  return {
    response: anAxiosResponse(
      {
        data: null,
        error: 'Id not valid',
        ok: false,
      },
      403,
    ),
  };
}

export function aSearchMissionEngagementResponse() {
  return {
    hits: [
      {
        __v: 57,
        activity: 'Distribution',
        adresse: '19 Avenue Emile Sescousse',
        applicationUrl: 'https://api.api-engagement.beta.gouv.fr/r/5f9bfffb959e010008e97bab/5fa438777a2fa04fc30aeaa6',
        associationId: 'c6d695d1-8dea-42fc-99fb-942d6ca3d01e',
        associationName: 'Coopaz',
        associationRNA: 'W401009931',
        associationReseaux: [],
        associationRna: 'W401009931',
        associationSiren: '',
        associationSources: [
          'JeVeuxAider.gouv.fr',
        ],
        associationTags: [],
        audience: [
          'false',
        ],
        city: 'Azur',
        clientId: '6581',
        country: 'FR',
        createdAt: '2020-10-30T11:58:51.387Z',
        departmentCode: '40',
        departmentName: 'Landes',
        description: 'Je me rends sur le site de l’association de fourniture de biens de première\nnécessité et participe notamment à :\n\n • la récupération des produits (notamment en voiture) ;\n • la préparation des paniers contenant les produits ;\n • la disposition des paniers afin d’en assurer leur distribution ;\n • la préparation des espaces pour les repas en appliquant les règles de\n   sécurisation sanitaire ;\n • le déconditionnement et la cuisine des produits : préparation, cuisson … ;\n • la distribution/livraison des repas ;\n • le cas échéant et en lien avec les personnels de la structure, l’accueil et\n   l’accompagnement des personnes vulnérables ou assignées dans un lieu pour\n   raisons sanitaires.\n\nCette mission n’est accessible qu’aux personnes majeures, de moins de 70 ans et\nen bonne santé.\n\nPour me rendre sur site, j’évite d’emprunter les transports en commun lorsque\ncela est possible, notamment aux heures de pointe. Si j’emprunte les transports\nen commun en Ile-de-France, je me munis de l’autorisation de déplacement que\nj’aurai renseigné et du justificatif fourni par la structure au profit de\nlaquelle je réalise la mission. Sur place, je respecte les règles de sécurité et\nles gestes barrières afin de me protéger et de protéger les autres. Au moindre\ndoute d’infection, je ne me mobilise pas et je reste chez moi.\n\n\\n\\nObjectifs: \\n\n\nEn cette période de crise sanitaire, les personnes les plus démunies doivent\naccéder aux biens qui leur sont vitaux au quotidien. Les associations d’aide\nalimentaire et non alimentaire ainsi que les associations de lutte contre\nl’exclusion et la pauvreté ont besoin de la mobilisation citoyenne pour assurer\nla continuité de toutes ces activités essentielles. Ce besoin s’étend aux\nétablissement hôteliers qui accueillent des personnes en isolement.',
        domain: 'sante',
        domainLogo: 'https://jeveuxaider.fra1.digitaloceanspaces.com/public/production/8494/QhO2jb6EiUo9sTa.jpg',
        id: '5f9bfffb959e010008e97bab',
        location: {
          lat: 43.7988,
          lon: -1.30211,
        },
        metadata: '',
        moderation: [
          {
            _id: '60a723867e29de071cccc054',
            author: 'api',
            publisher: '5f5931e16c7ea514150a8190',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f5931e16c7ea514150a8190/1c5ffc86f998ecff67748f46998e15336986f4a7.png',
            publisherName: 'Je Participe – Bordeaux.fr',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723867e29de071cccc055',
            author: 'api',
            publisher: '5f59305b6c7ea514150a818e',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f59305b6c7ea514150a818e/logo-jagis-pour-la-nature.png',
            publisherName: "J'agis pour la nature",
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723867e29de071cccc056',
            author: 'api',
            publisher: '5f592d415655a711feb4460e',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f592d415655a711feb4460e/Benevolt-rouge-OK.png',
            publisherName: 'Benevolt',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723867e29de071cccc057',
            author: 'api',
            publisher: '5fa3ce789c883360bebe2591',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5fa3ce789c883360bebe2591/logo_dmm.png',
            publisherName: "Place de l'Engagement – Meurthe-et-Moselle.fr",
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723867e29de071cccc058',
            author: 'api',
            publisher: '5fbbb3f5497b7f7d1092390d',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5fbbb3f5497b7f7d1092390d/place des asso lille logo.png',
            publisherName: 'Place des Assos - Lille.fr',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723867e29de071cccc059',
            author: 'api',
            publisher: '6059fc05ca0b22693aaa4e88',
            publisherName: 'Talence Bénévolat',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723867e29de071cccc05a',
            author: 'api',
            publisher: '6059fc0dca0b22693aaa4e89',
            publisherName: 'Agissons – Colombes.fr',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723867e29de071cccc05b',
            author: 'api',
            publisher: '606de85809f38e073691220b',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/606de85809f38e073691220b/Comment ça marche _ (1).png',
            publisherName: '1 jeune 1 mentor',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723867e29de071cccc05c',
            author: 'api',
            publisher: '5fa95bb745bd213b420bf559',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5fa95bb745bd213b420bf559/logo-makesense-dark.png',
            publisherName: 'Makesense',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a727267e29de071ccd5642',
            publisher: '5f8b3c7552a1412baaa0cd44',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f8b3c7552a1412baaa0cd44/linkedin.png',
            publisherName: 'Linkedin',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a727ee7e29de071ccda1a9',
            publisher: '5f8b3c6c52a1412baaa0cd43',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f8b3c6c52a1412baaa0cd43/Indeed-logo-square.png',
            publisherName: 'Indeed',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
        ],
        organizationActions: [],
        organizationBeneficiaries: [],
        organizationCity: 'Azur',
        organizationDescription: '',
        organizationFamille: "aide à l'emploi, développement local, promotion de solidarités économiques, vie locale",
        organizationFullAddress: 'Azur, 40140 Azur, France',
        organizationId: '1685',
        organizationName: "Coop'Az",
        organizationOriginalFullAddress: 'Azur, 40140 Azur, France',
        organizationPostCode: '40140',
        organizationRNA: 'W401009931',
        organizationReseaux: [],
        organizationStatusJuridique: 'Association',
        organizationTheme: 'Economie et développement local',
        organizationUrl: 'https://www.jeveuxaider.gouv.fr/organisations/1685-coopaz',
        places: 30,
        postalCode: '40140',
        postedAt: '2020-10-30T11:59:25.000Z',
        priority: '',
        publisherId: '5f5931496c7ea514150a818f',
        publisherLogo: 'https://apicivique.cellar-c2.services.clever-cloud.com/app/publishers/5f5931496c7ea514150a818f/jeveuxaider%20api.png',
        publisherName: 'JeVeuxAider.gouv.fr',
        publisherUrl: 'https://www.jeveuxaider.gouv.fr/',
        region: 'Nouvelle-Aquitaine',
        remote: 'no',
        soft_skills: [
          'ecoute active',
          'empathie',
          'ethique',
        ],
        startAt: '2022-10-31T09:09:09.312Z',
        tasks: [
          'Identifier les attentes / les besoins du client / du public',
          'Aider des personnes avec un besoin psychologique / social',
        ],
        title: 'Je distribue des produits de première nécessité et des repas aux plus démunis, dans la rue ou au sein d’établissements dédiés',
        updatedAt: '2022-10-31T09:09:09.312Z',
      },
      {
        __v: 58,
        activity: "Lutte contre l'isolement",
        adresse: '18 Rue Moyenne',
        applicationUrl: 'https://api.api-engagement.beta.gouv.fr/r/5f9bffff959e010008e97bec/5fa438777a2fa04fc30aeaa6',
        associationId: 'de10ad4e-066a-4b37-bd74-465c05ce94cc',
        associationName: 'COLLECTIF DES MAMANS',
        associationReseaux: [],
        associationRna: 'W343012141',
        associationSources: [],
        associationTags: [],
        audience: [
          'false',
        ],
        city: 'Bourges',
        clientId: '6583',
        country: 'FR',
        createdAt: '2020-10-30T11:58:55.918Z',
        departmentCode: '18',
        departmentName: 'Cher',
        description: 'Je suis mis en contact avec une personne isolée par le biais d’une association\nou d’un organisme public :\n\n • j’échange avec la personne, prends de ses nouvelles ;\n • je fais remonter des alertes aux structures, si je le juge nécessaire, sur\n   l’état de santé – mentale ou physique – et les besoins exprimés de la\n   personne contactée.\n\nLorsque je m’engage à prendre contact avec des personnes âgées, en situation de\nhandicap, en situation de pauvreté, de précarité, ou d’isolement, je m’engage à\nsuivre les recommandations précisées dans les kits de formation.\n\nCette mission est accessible à tous les citoyens qui le souhaitent.\n\n\\n\\nObjectifs: \\n\n\nEn cette période de crise sanitaire et de confinement, il est essentiel que les\npersonnes les plus en risque d’isolement relationnel puissent bénéficier de\ncontacts réguliers et bienveillants. Cet isolement peut, en effet, être rompu en\norganisant un lien par téléphone, visio ou par d’autres moyens de communication.',
        domain: 'sante',
        domainLogo: 'https://jeveuxaider.fra1.digitaloceanspaces.com/public/production/8459/tImP4fz0Xa5g2uk.jpg',
        id: '5f9bffff959e010008e97bec',
        location: {
          lat: 47.0836,
          lon: 2.39559,
        },
        metadata: '',
        moderation: [
          {
            _id: '60a723ae7e29de071ccce82f',
            author: 'api',
            publisher: '5f5931e16c7ea514150a8190',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f5931e16c7ea514150a8190/1c5ffc86f998ecff67748f46998e15336986f4a7.png',
            publisherName: 'Je Participe – Bordeaux.fr',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723ae7e29de071ccce830',
            author: 'api',
            publisher: '5f59305b6c7ea514150a818e',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f59305b6c7ea514150a818e/logo-jagis-pour-la-nature.png',
            publisherName: "J'agis pour la nature",
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723ae7e29de071ccce831',
            author: 'api',
            publisher: '5f592d415655a711feb4460e',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f592d415655a711feb4460e/Benevolt-rouge-OK.png',
            publisherName: 'Benevolt',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723ae7e29de071ccce832',
            author: 'api',
            publisher: '5fa3ce789c883360bebe2591',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5fa3ce789c883360bebe2591/logo_dmm.png',
            publisherName: "Place de l'Engagement – Meurthe-et-Moselle.fr",
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723ae7e29de071ccce833',
            author: 'api',
            publisher: '5fbbb3f5497b7f7d1092390d',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5fbbb3f5497b7f7d1092390d/place des asso lille logo.png',
            publisherName: 'Place des Assos - Lille.fr',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723ae7e29de071ccce834',
            author: 'api',
            publisher: '6059fc05ca0b22693aaa4e88',
            publisherName: 'Talence Bénévolat',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723ae7e29de071ccce835',
            author: 'api',
            publisher: '6059fc0dca0b22693aaa4e89',
            publisherName: 'Agissons – Colombes.fr',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723ae7e29de071ccce836',
            author: 'api',
            publisher: '606de85809f38e073691220b',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/606de85809f38e073691220b/Comment ça marche _ (1).png',
            publisherName: '1 jeune 1 mentor',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a723ae7e29de071ccce837',
            author: 'api',
            publisher: '5fa95bb745bd213b420bf559',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5fa95bb745bd213b420bf559/logo-makesense-dark.png',
            publisherName: 'Makesense',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a727267e29de071ccd564e',
            publisher: '5f8b3c7552a1412baaa0cd44',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f8b3c7552a1412baaa0cd44/linkedin.png',
            publisherName: 'Linkedin',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
          {
            _id: '60a727ee7e29de071ccda1b6',
            publisher: '5f8b3c6c52a1412baaa0cd43',
            publisherLogo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f8b3c6c52a1412baaa0cd43/Indeed-logo-square.png',
            publisherName: 'Indeed',
            statusCode: 'ACCEPTED',
            statusComment: '',
          },
        ],
        organizationActions: [],
        organizationBeneficiaries: [],
        organizationCity: 'Bourges',
        organizationDescription: '',
        organizationFamille: "amicales, groupements affinitaires, groupements d'entraide (hors défense de droits fondamentaux",
        organizationFullAddress: 'Rue Francis 18000 Bourges',
        organizationId: '4602',
        organizationName: 'Collectif des mamans',
        organizationOriginalFullAddress: 'Bourges, 18000 Bourges, France',
        organizationPostCode: '18000',
        organizationRNA: 'W343012141',
        organizationReseaux: [],
        organizationStatusJuridique: 'Association',
        organizationTheme: 'Loisirs et vie sociale',
        organizationUrl: 'https://www.jeveuxaider.gouv.fr/organisations/4602-collectif-des-mamans',
        places: 75,
        postalCode: '18000',
        postedAt: '2020-10-30T12:19:13.000Z',
        priority: '',
        publisherId: '5f5931496c7ea514150a818f',
        publisherLogo: 'https://apicivique.cellar-c2.services.clever-cloud.com/app/publishers/5f5931496c7ea514150a818f/jeveuxaider%20api.png',
        publisherName: 'JeVeuxAider.gouv.fr',
        publisherUrl: 'https://www.jeveuxaider.gouv.fr/',
        region: 'Centre-Val de Loire',
        remote: 'no',
        soft_skills: [
          'ecoute active',
          'empathie',
          'ethique',
        ],
        startAt: '2020-10-30T09:00:00.000Z',
        tasks: [
          'Identifier les attentes / les besoins du client / du public',
          'Aider des personnes avec un besoin psychologique / social',
        ],
        title: 'Je maintiens un lien avec des personnes fragiles isolées (âgées, malades, situation de handicap, de pauvreté, de précarité, etc.)',
        updatedAt: '2022-10-31T09:12:16.749Z',
      },
    ],
    total: 2,
  };
}
