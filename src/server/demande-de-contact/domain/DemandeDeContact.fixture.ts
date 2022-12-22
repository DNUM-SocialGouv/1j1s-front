import {  DemandeDeContactAccompagnement } from './DemandeDeContact';

export function aDemandeDeContactAccompagnement(): DemandeDeContactAccompagnement {
  return {
    age: 23,
    codePostal: '60000',
    commentaire: 'un commentaire',
    email: 'sergen.kovar@gmail.com',
    nom: 'KOVAR',
    prénom: 'Sergen',
    téléphone: '0606060606',
    ville: 'Beauvais',
  };
}
