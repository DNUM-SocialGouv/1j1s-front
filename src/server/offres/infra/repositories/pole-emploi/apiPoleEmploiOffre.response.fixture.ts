import { OffreResponse } from './poleEmploiOffre.response';

export function anOffreEmploiResponseCompétenceList(): OffreResponse.Compétence[] {
  return [
    anOffreEmploiResponseCompétence(),
    anOffreEmploiResponseCompétence({ libelle: 'Déterminer les besoins thérapeutiques' }),
  ];
}

export function anOffreEmploiResponseCompétenceListAvecCompétenceNonDéfinie(): OffreResponse.Compétence[] {
  return [
    anOffreEmploiResponseCompétence(),
    anOffreEmploiResponseCompétence({ libelle: undefined }),
  ];
}

function anOffreEmploiResponseCompétence(override?: Partial<OffreResponse.Compétence>): OffreResponse.Compétence {
  return {
    libelle: 'Réaliser la prescription médicale',
    ...override,
  };
}

export function anOffreEmploiResponseFormationList(): OffreResponse.Formation[] {
  return [
    anOffreEmploiResponseFormation(),
    anOffreEmploiResponseFormation({ commentaire: 'Licence pro commerce', niveauLibelle: 'Bac+3 et plus ou équivalents' }),
  ];
}

export function anOffreEmploiResponseFormationListAvecFormationNonDéfinie(): OffreResponse.Formation[] {
  return [
    anOffreEmploiResponseFormation(),
    anOffreEmploiResponseFormation({ commentaire: undefined, niveauLibelle: undefined }),
  ];
}

function anOffreEmploiResponseFormation(override?: Partial<OffreResponse.Formation>): OffreResponse.Formation {
  return {
    commentaire: 'DE docteur en médecine',
    niveauLibelle: 'Bac+5 et plus ou équivalents',
    ...override,
  };
}

export function anOffreEmploiResponseQualitéeProfessionnelleList(): OffreResponse.QualitéeProfessionnelle[] {
  return [
    anOffreEmploiResponseQualitéeProfessionnelle(),
    anOffreEmploiResponseQualitéeProfessionnelle({ libelle: 'Capacité de décision' }),
  ];
}

export function anOffreEmploiResponseQualitéeProfessionnelleListAvecQualitéeNonDéfinie(): OffreResponse.QualitéeProfessionnelle[] {
  return [
    anOffreEmploiResponseQualitéeProfessionnelle(),
    anOffreEmploiResponseQualitéeProfessionnelle({ libelle: undefined }),
  ];
}

function anOffreEmploiResponseQualitéeProfessionnelle(override?: Partial<OffreResponse.QualitéeProfessionnelle>): OffreResponse.QualitéeProfessionnelle {
  return {
    libelle: 'Capacité d\'adaptation',
    ...override,
  };
}
