import { OffreEmploiResponse } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response';

export function anOffreEmploiResponseCompétenceList(): OffreEmploiResponse.Compétence[] {
  return [
    anOffreEmploiResponseCompétence(),
    anOffreEmploiResponseCompétence({ libelle: 'Déterminer les besoins thérapeutiques' }),
  ];
}

export function anOffreEmploiResponseCompétenceListAvecCompétenceNonDéfinie(): OffreEmploiResponse.Compétence[] {
  return [
    anOffreEmploiResponseCompétence(),
    anOffreEmploiResponseCompétence({ libelle: undefined }),
  ];
}

function anOffreEmploiResponseCompétence(override?: Partial<OffreEmploiResponse.Compétence>): OffreEmploiResponse.Compétence {
  return {
    libelle: 'Réaliser la prescription médicale',
    ...override,
  };
}

export function anOffreEmploiResponseFormationList(): OffreEmploiResponse.Formation[] {
  return [
    anOffreEmploiResponseFormation(),
    anOffreEmploiResponseFormation({ commentaire: 'Licence pro commerce', niveauLibelle: 'Bac+3 et plus ou équivalents' }),
  ];
}

export function anOffreEmploiResponseFormationListAvecFormationNonDéfinie(): OffreEmploiResponse.Formation[] {
  return [
    anOffreEmploiResponseFormation(),
    anOffreEmploiResponseFormation({ commentaire: undefined, niveauLibelle: undefined }),
  ];
}

function anOffreEmploiResponseFormation(override?: Partial<OffreEmploiResponse.Formation>): OffreEmploiResponse.Formation {
  return {
    commentaire: 'DE docteur en médecine',
    niveauLibelle: 'Bac+5 et plus ou équivalents',
    ...override,
  };
}

export function anOffreEmploiResponseQualitéeProfessionnelleList(): OffreEmploiResponse.QualitéeProfessionnelle[] {
  return [
    anOffreEmploiResponseQualitéeProfessionnelle(),
    anOffreEmploiResponseQualitéeProfessionnelle({ libelle: 'Capacité de décision' }),
  ];
}

export function anOffreEmploiResponseQualitéeProfessionnelleListAvecQualitéeNonDéfinie(): OffreEmploiResponse.QualitéeProfessionnelle[] {
  return [
    anOffreEmploiResponseQualitéeProfessionnelle(),
    anOffreEmploiResponseQualitéeProfessionnelle({ libelle: undefined }),
  ];
}

function anOffreEmploiResponseQualitéeProfessionnelle(override?: Partial<OffreEmploiResponse.QualitéeProfessionnelle>): OffreEmploiResponse.QualitéeProfessionnelle {
  return {
    libelle: 'Capacité d\'adaptation',
    ...override,
  };
}
