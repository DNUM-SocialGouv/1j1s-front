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
