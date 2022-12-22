import { DemandeDeContactTipimail } from '~/server/envoie-email/domain/DemandeDeContactTipimail';
import { createSuccess } from '~/server/errors/either';

import { EnvoieEmailService } from './envoieEmail.service';

export function aDemandeDeContactTipimail(): EnvoieEmailService {
  return {
    envoyer: jest.fn().mockResolvedValue(createSuccess(undefined)),
  } as unknown as EnvoieEmailService;
}

export const unEnvoieEmail: () => DemandeDeContactTipimail = () => ({
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
      address: 'reply@example.com',
      personalName: 'Replytoname',
    },
    subject: 'Demande de contact 1jeune1solution',
    text: 'Bonjour,\\nUne nouvelle demande de contact vient d\'arriver.',
  },
  to: [
    {
      address:'sergen.kovar@octo.com',
      personalName:'Sergen Kovar',
    },
  ],
});
