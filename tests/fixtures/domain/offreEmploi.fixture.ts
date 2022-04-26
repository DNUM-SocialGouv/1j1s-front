import {
  OffreEmploi,
  OffreEmploiFiltre,
} from '~/server/offresEmploi/domain/offreEmploi';

export function anOffreEmploi(override?: Partial<OffreEmploi>): OffreEmploi {
  return {
    id: '130WPHH',
    intitule: 'Gestionnaire ADV    (H/F)',
    ...override,
  };
}

export function anOffreEmploiList(): OffreEmploi[] {
  return [
    anOffreEmploi(),
    anOffreEmploi({
      id: '130WPHC',
      intitule: 'Maçon / Maçonne',
    }),
    anOffreEmploi({
      id: '130WPHB',
      intitule: 'Surveillant / Surveillante de nuit         (H/F)',
    }),
  ];
}

export function anOffreEmploiFiltre(
  override?: Partial<OffreEmploiFiltre>,
): OffreEmploiFiltre {
  return {
    motClé: 'boulanger',
    page: 1,
    ...override,
  };
}
