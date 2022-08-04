import { RécupérerMesuresJeunesUseCase } from '~/server/mesuresJeunes/useCases/récupérerMesuresJeunesUseCase';

export interface RécupérerMesuresJeunesDependenciesContainer {
  readonly récupérerMesuresJeunes: RécupérerMesuresJeunesUseCase
}
