import {
  Mission,
  MissionEngagementFiltre,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';

export function aMissionEngagementFiltre(override?: Partial<MissionEngagementFiltre>): MissionEngagementFiltre {
  return {
    domain:'sante',
    from: 1,
    publisher: 'a-publisher-id',
    size: 30,
    ...override,
  };
}

export function aRésultatRechercheMission(override?: Partial<RésultatsRechercheMission>): RésultatsRechercheMission {
  return {
    nombreRésultats: 2,
    résultats: [
      anAmbassadeurDuDonDeVêtementMission(),
      aSoutienAuxEnfantsEttAuxJeunesMission(),
    ],
    ...override,
  };
}

function anAmbassadeurDuDonDeVêtementMission(): Mission {
  return {
    description: ' • Faire connaître les activités du Relais et inciter au don de textiles dans\n   votre quartier \n • Prévenir en cas de débordement ou de dégradation constatés d’une borne\n • Sensibiliser vos voisins \n • Participer à des évènements de collecte de collecte à proximité de son\n   domicile\n\n\\n\\nObjectifs: \\n\n\nNous désirons innover en développant un réseau d’ambassadeurs bénévoles autour\ndu geste du don dans la ville de Poissy, chaque ambassadeur se voyant assigné un\npoint de collecte - « une borne » - à proximité de son domicile et pouvant par\nla suite organiser des animations autour de la réduction des déchets et du tri\ndes textiles. ',
    débutContrat: '09/05/2022',
    id: '6278e8ced7dda60703c3ca40',
    logo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f5931496c7ea514150a818f/logo_JVA_gouv_carre_light.png',
    nomEntreprise: 'Ebs le relais val de seine',
    titre: 'Je deviens Ambassadeur du don des vêtements',
    étiquetteList: [
      'Poissy (78300)',
      '09/05/2022',
    ],
  };
}

function aSoutienAuxEnfantsEttAuxJeunesMission(): Mission {
  return {
    description: 'Votre mission auprès de la personne accompagnée consiste à :\n\n • lui apporter une aide méthodologique dans ses devoirs  \n • la motiver, l’encourager à la persévérance scolaire \n • lui faire découvrir des ressources éducatives et culturelles \n • si l’enseignement est partiellement à distance, l’aider à accéder à ses\n   cours, à communiquer avec ses enseignants \n\n\\n\\nObjectifs: \\n\n\nCette mission de mentorat a pour but de  favoriser l’autonomie et le\ndéveloppement de la personne accompagnée en établissant des objectifs évolutifs\net adaptés à ses besoins spécifiques.',
    débutContrat: '01/01/2022',
    id: '61aaf6d48028f7075b9dd472',
    logo: 'https://apicivique.s3.eu-west-3.amazonaws.com/app/publishers/5f5931496c7ea514150a818f/logo_JVA_gouv_carre_light.png',
    nomEntreprise: 'Pass-Age',
    titre: 'J’apporte un soutien aux enfants et jeunes, notamment dans les quartiers populaires, les zones rurales et territoires fragiles',
    étiquetteList: [
      'Rueil-Malmaison (92500)',
      '01/01/2022',
    ],
  };
}
