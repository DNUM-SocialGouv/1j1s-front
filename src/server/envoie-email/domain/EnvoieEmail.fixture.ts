import { EnvoieEmail } from '~/server/envoie-email/domain/EnvoieEmail';

export function aEnvoieEmailList(): EnvoieEmail[] {
  return [
    {
      headers: {
        'X-TM-DOMAIN': '1jeune1solution.gouv.fr',
        'X-TM-TAGS': ['accompagnement', 'contact mission locale'],
      },
      msg: {
        from: {
          address: 'contact-1j1s@sg.social.gouv.fr',
          personalName: '1jeune1solution',
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
    },
  ];
}
