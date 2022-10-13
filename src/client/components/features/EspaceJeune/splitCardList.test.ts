import { splitCardList } from '~/client/components/features/EspaceJeune/splitCardList';

describe('splitCardList', () => {
  it('retourne un tableau de tableaux avec maximum 3 cartes par tableau', () => {
    const aCardList = [
      {
        bannière: {
          alt: '',
          url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/animation_locale_en_association3_86cfe116f6.webp',
        },
        concerné: 'Les étudiants en alternance ou récemment diplômés d’études supérieures (à partir de bac+2, jusqu’à 2 ans en sortie d’études) qui cherchent un poste dans des TPE, PME et ETI françaises. ',
        contenu: 'Accédez à des postes en lien avec la transition énergétique et écologique.',
        titre: 'Le Volontariat Territorial en Entreprise Vert (VTE Vert)',
        url: 'https://travail-emploi.gouv.fr/le-ministere-en-action/relance-activite/plan-1jeune-1solution/faciliter-l-entree-dans-la-vie-professionnelle-10878/article/aide-volontariat-territorial-en-entreprise-vert-vte-vert',
      },
      {
        bannière: {
          alt: '',
          url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/resize_vievia_6f454275d4.webp',
        },
        concerné: "Les jeunes de 18 à 28 ans, français ou issu de l'EEE.",
        contenu: 'Partez à l’étranger en toute sécurité pour travailler 6 à 24 mois dans une entreprise ou une administration française. Ce n’est pas du bénévolat : début de carrière ou mission à responsabilité, vous êtes rémunéré.',
        titre: 'Le Volontariat International : un tremplin professionnel !',
        url: 'https://mon-vie-via.businessfrance.fr/qu-est-ce-que-le-volontariat-international',
      },
      {
        bannière: {
          alt: 'smartcrop.webp',
          url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_be453b2044.webp',
        },
        concerné: 'Les jeunes âgés de 18 ans à 30 ans ayant récemment obtenu un diplôme d’au moins BAC+2 qui souhaitent intégrer une collectivité territoriale rurale pour une mission de 12 à 18 mois.',
        contenu: 'Renforcez vos compétences en ingénierie de projet en postulant à une mission dans le domaine du numérique, des ressources humaines, de l’urbanisme et bien d’autres encore !',
        titre: 'Le Volontaire Territorial en Administration (VTA) ',
        url: 'https://vta.anct.gouv.fr/',
      },
      {
        bannière: {
          alt: '',
          url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_CIE_c0f305bf51.webp',
        },
        concerné: 'Les jeunes de moins de 26 ans sans emploi, qui rencontrent des difficultés d’accès à l’emploi (sociales et/ou professionnelles) et qui souhaitent bénéficier d’un parcours personnalisé et d’une expérience professionnelle **dans une entreprise du secteur marchand**.\nLes jeunes en situation de handicap sont concernés jusqu’à 30 ans inclus. \n',
        contenu: 'Engagez-vous dans une expérience professionnelle en CDI ou en CDD (6 à 24 mois) tout en étant suivi par un référent. ',
        titre: 'Le Contrat Initiative Emploi (CIE) Jeunes',
        url: 'https://1j1s-front.osc-fr1.scalingo.io/articles/le-contrat-d-initiative-emploi-jeunes-cie-jeunes-votre-passeport-vers-l-emploi',
      },
      {
        bannière: {
          alt: '',
          url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_PEC_b4abd967ca.webp',
        },
        concerné: 'Les jeunes de moins de 26 ans sans emploi, qui rencontrent des difficultés d’accès à l’emploi et qui souhaitent bénéficier d’un parcours personnalisé et d’une expérience professionnelle dans le secteur associatif ou public. \nLes jeunes en situation de handicap sont concernés jusqu’à 30 ans inclus.',
        contenu: 'Développez des compétences transférables grâce à un accompagnement, une mise en situation professionnelle et un accès facilité à la formation.',
        titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
        url: 'https://1j1s-front.osc-fr1.scalingo.io/articles/pec-jeunes-pour-developper-des-competences-transferables',
      },
      {
        bannière: {
          alt: '',
          url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_8d6d4529c5.webp',
        },
        concerné: "Les jeunes de moins de 26 ans qui rencontrent des difficultés d’accès à l’emploi (sociales et professionnelles) et jusqu'à 30 ans inclus pour les jeunes reconnus travailleurs handicapés.",
        contenu: 'Développez de nouvelles compétences et prenez confiance en vous ! Vous bénéficierez d’un accompagnement individualisé au sein d’une SIAE.',
        titre: 'Le Parcours d’Insertion par l’Activité Economique (IAE) ',
        url: 'https://inclusion.beta.gouv.fr/',
      },
      {
        bannière: {
          alt: '',
          url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_ans_452fa02ecc.webp',
        },
        concerné: "Les jeunes de moins de 30 ans issus de l'enseignement supérieur ou de la formation professionnelle.",
        contenu: "L'Agence Nationale du Sport octroie une aide financière aux associations sportives en finançant jusqu'à 40% de votre salaire. Cela peut vous aider à trouver un emploi !",
        titre: "Un emploi dans le domaine sportif c'est grâce à l'ANS !",
        url: 'https://1j1s-front.osc-fr1.scalingo.io/articles/votre-emploi-dans-le-domaine-sportif-c-est-grace-a-l-ans',
      },
    ];
    const expected = [
      [
        {
          bannière: {
            alt: '',
            url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/animation_locale_en_association3_86cfe116f6.webp',
          },
          concerné: 'Les étudiants en alternance ou récemment diplômés d’études supérieures (à partir de bac+2, jusqu’à 2 ans en sortie d’études) qui cherchent un poste dans des TPE, PME et ETI françaises. ',
          contenu: 'Accédez à des postes en lien avec la transition énergétique et écologique.',
          titre: 'Le Volontariat Territorial en Entreprise Vert (VTE Vert)',
          url: 'https://travail-emploi.gouv.fr/le-ministere-en-action/relance-activite/plan-1jeune-1solution/faciliter-l-entree-dans-la-vie-professionnelle-10878/article/aide-volontariat-territorial-en-entreprise-vert-vte-vert',
        },
        {
          bannière: {
            alt: '',
            url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/resize_vievia_6f454275d4.webp',
          },
          concerné: "Les jeunes de 18 à 28 ans, français ou issu de l'EEE.",
          contenu: 'Partez à l’étranger en toute sécurité pour travailler 6 à 24 mois dans une entreprise ou une administration française. Ce n’est pas du bénévolat : début de carrière ou mission à responsabilité, vous êtes rémunéré.',
          titre: 'Le Volontariat International : un tremplin professionnel !',
          url: 'https://mon-vie-via.businessfrance.fr/qu-est-ce-que-le-volontariat-international',
        },
        {
          bannière: {
            alt: 'smartcrop.webp',
            url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_be453b2044.webp',
          },
          concerné: 'Les jeunes âgés de 18 ans à 30 ans ayant récemment obtenu un diplôme d’au moins BAC+2 qui souhaitent intégrer une collectivité territoriale rurale pour une mission de 12 à 18 mois.',
          contenu: 'Renforcez vos compétences en ingénierie de projet en postulant à une mission dans le domaine du numérique, des ressources humaines, de l’urbanisme et bien d’autres encore !',
          titre: 'Le Volontaire Territorial en Administration (VTA) ',
          url: 'https://vta.anct.gouv.fr/',
        },
      ],
      [
        {
          bannière: {
            alt: '',
            url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_CIE_c0f305bf51.webp',
          },
          concerné: 'Les jeunes de moins de 26 ans sans emploi, qui rencontrent des difficultés d’accès à l’emploi (sociales et/ou professionnelles) et qui souhaitent bénéficier d’un parcours personnalisé et d’une expérience professionnelle **dans une entreprise du secteur marchand**.\nLes jeunes en situation de handicap sont concernés jusqu’à 30 ans inclus. \n',
          contenu: 'Engagez-vous dans une expérience professionnelle en CDI ou en CDD (6 à 24 mois) tout en étant suivi par un référent. ',
          titre: 'Le Contrat Initiative Emploi (CIE) Jeunes',
          url: 'https://1j1s-front.osc-fr1.scalingo.io/articles/le-contrat-d-initiative-emploi-jeunes-cie-jeunes-votre-passeport-vers-l-emploi',
        },
        {
          bannière: {
            alt: '',
            url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_PEC_b4abd967ca.webp',
          },
          concerné: 'Les jeunes de moins de 26 ans sans emploi, qui rencontrent des difficultés d’accès à l’emploi et qui souhaitent bénéficier d’un parcours personnalisé et d’une expérience professionnelle dans le secteur associatif ou public. \nLes jeunes en situation de handicap sont concernés jusqu’à 30 ans inclus.',
          contenu: 'Développez des compétences transférables grâce à un accompagnement, une mise en situation professionnelle et un accès facilité à la formation.',
          titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
          url: 'https://1j1s-front.osc-fr1.scalingo.io/articles/pec-jeunes-pour-developper-des-competences-transferables',
        },
        {
          bannière: {
            alt: '',
            url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_8d6d4529c5.webp',
          },
          concerné: "Les jeunes de moins de 26 ans qui rencontrent des difficultés d’accès à l’emploi (sociales et professionnelles) et jusqu'à 30 ans inclus pour les jeunes reconnus travailleurs handicapés.",
          contenu: 'Développez de nouvelles compétences et prenez confiance en vous ! Vous bénéficierez d’un accompagnement individualisé au sein d’une SIAE.',
          titre: 'Le Parcours d’Insertion par l’Activité Economique (IAE) ',
          url: 'https://inclusion.beta.gouv.fr/',
        },
      ],
      [
        {
          bannière: {
            alt: '',
            url: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/smartcrop_ans_452fa02ecc.webp',
          },
          concerné: "Les jeunes de moins de 30 ans issus de l'enseignement supérieur ou de la formation professionnelle.",
          contenu: "L'Agence Nationale du Sport octroie une aide financière aux associations sportives en finançant jusqu'à 40% de votre salaire. Cela peut vous aider à trouver un emploi !",
          titre: "Un emploi dans le domaine sportif c'est grâce à l'ANS !",
          url: 'https://1j1s-front.osc-fr1.scalingo.io/articles/votre-emploi-dans-le-domaine-sportif-c-est-grace-a-l-ans',
        },
      ],
    ];

    expect(splitCardList(aCardList, 3)).toEqual(expected);
  });
});
