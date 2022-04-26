import { JobEtudiant } from '~/server/jobsEtudiant/domain/jobEtudiant';

export function aJobEtudiantList(): JobEtudiant[] {
  return [
    { id: '130WZJJ', intitule: 'Hote/Hotesse de Caisse (H/F)' },
    { id: '130WZJD', intitule: 'ou Accompagnant(e) éducatif(ve) et social(e) (H/F)' },
    { id: '130WZHH', intitule: 'Auxiliaire de vie            (H/F)' },
  ];
}
