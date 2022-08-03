import { Either } from '~/server/errors/either';
import { MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';

export interface MesuresJeunesRepository {
  getMesuresJeunes() : Promise<Either<MesuresJeunes>>
}
