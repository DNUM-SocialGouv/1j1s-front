import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { Mail } from '~/server/mail/domain/mail';

export function buildDemandeDeContactMail(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Mail {
  return {
    headers: {
      'X-TM-DOMAIN': '1jeune1solution.gouv.fr',
      'X-TM-TAGS': ['accompagnement', demandeDeContactAccompagnement.établissement.type],
    },
    msg: {
      from: {
        address: 'contact-1j1s@sg.social.gouv.fr',
        personalName: '1jeune1solution',
      },
      replyTo: {
        address: demandeDeContactAccompagnement.email,
        personalName: `${demandeDeContactAccompagnement.prénom} ${demandeDeContactAccompagnement.nom}`,
      },
      subject: 'Demande de contact 1jeune1solution',
      text: `Cette demande de contact a été renseignée depuis le site 1jeune1solution https://www.1jeune1solution.gouv.fr/accompagnement :
    • Prénom : ${demandeDeContactAccompagnement.prénom} 
    • Nom : ${demandeDeContactAccompagnement.nom} 
    • Adresse email : ${demandeDeContactAccompagnement.email}
    • Téléphone : ${demandeDeContactAccompagnement.téléphone}
    • Age : ${demandeDeContactAccompagnement.age}
    • Ville : ${demandeDeContactAccompagnement.nomCommune} (${demandeDeContactAccompagnement.codeCommune}) 
    • Commentaire : ${demandeDeContactAccompagnement.commentaire || 'Aucun commentaire'}`,
    },
    to: [
      {
        address: demandeDeContactAccompagnement.établissement.email,
        personalName: demandeDeContactAccompagnement.établissement.nom,
      },
    ],
  };
}
