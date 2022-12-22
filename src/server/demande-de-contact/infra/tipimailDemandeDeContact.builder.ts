import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

import { DemandeDeContactTipimail } from '../../envoie-email/domain/DemandeDeContactTipimail';
import { DemandeDeContactAccompagnement } from '../domain/DemandeDeContact';

export function buildDemandeDeContactApiTipimail(envoieEmail: DemandeDeContactAccompagnement, etablissement: ÉtablissementAccompagnement ): DemandeDeContactTipimail{
  return {
    headers: {
      'X-TM-DOMAIN': '1jeune1solution.gouv.fr',
      'X-TM-TAGS': ['accompagnement', 'contact mission locale'],
    },
    msg: {
      from: {
        address: 'contact-1j1s@sg.social.gouv.fr',
        personalName: '1jeune1solution',
      },
      replyTo: {
        address: envoieEmail.email ,
        personalName: envoieEmail.prénom,
      },
      subject: 'Demande de contact 1jeune1solution',
      text: 'Bonjour,\\nUne nouvelle demande de contact vient d\'arriver.',
    },
    to: [
      {
        address: etablissement.email,
        personalName: etablissement.nom,
      },
    ],
  };
}
