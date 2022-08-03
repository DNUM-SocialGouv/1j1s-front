import { RécupérerCartesJeunesUseCase } from '~/server/mesuresJeunes/useCases/récupérerCartesJeunes.useCase';

export interface RécupérerMesuresJeunesDependenciesContainer {
  readonly récupérerMesuresJeunes: RécupérerCartesJeunesUseCase
}
