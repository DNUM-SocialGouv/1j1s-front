import { Mail } from '~/server/mail/domain/mail';

export function aMail(): Mail {
  return {
    headers: {
      'X-TM-DOMAIN': '1jeune1solution.gouv.fr',
      'X-TM-TAGS': ['accompagnement', 'mission_locale'],
    },
    msg: {
      from: {
        address: 'contact-1j1s@sg.social.gouv.fr',
        personalName: '1jeune1solution',
      },
      replyTo: {
        address:'john.doe@email.com',
        personalName:'John Doe',
      },
      subject: 'Demande de contact 1jeune1solution',
      text: 'Cette demande de contact a été renseignée depuis le site 1jeune1solution https://www.1jeune1solution.gouv.fr/accompagnement :\n    • Prénom : John \n    • Nom : Doe \n    • Adresse email : john.doe@email.com\n    • Téléphone : 0606060606\n    • Age : 23\n    • Ville : Paris (75056) \n    • Commentaire : Merci de me recontacter',
    },
    to: [
      {
        address: 'email@email.com',
        personalName: 'Mission locale pour l\'insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements',
      },
    ],
  };
}

export function aMailWithRedirection(): Mail {
  return {
    headers: {
      'X-TM-DOMAIN': '1jeune1solution.gouv.fr',
      'X-TM-TAGS': ['accompagnement', 'mission_locale'],
    },
    msg: {
      from: {
        address: 'contact-1j1s@sg.social.gouv.fr',
        personalName: '1jeune1solution',
      },
      replyTo: {
        address:'john.doe@email.com',
        personalName:'John Doe',
      },
      subject: 'Demande de contact 1jeune1solution',
      text: 'Cette demande de contact a été renseignée depuis le site 1jeune1solution https://www.1jeune1solution.gouv.fr/accompagnement :\n    • Prénom : John \n    • Nom : Doe \n    • Adresse email : john.doe@email.com\n    • Téléphone : 0606060606\n    • Age : 23\n    • Ville : Paris (75056) \n    • Commentaire : Merci de me recontacter',
    },
    to: [
      {
        address: 'redirect@email.com',
        personalName: 'Mission locale pour l\'insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements',
      },
    ],
  };
}
