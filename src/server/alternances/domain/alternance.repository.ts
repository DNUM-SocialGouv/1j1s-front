import {
	Alternance,
	AlternanceFiltre,
} from '~/server/alternances/domain/alternance';
import { Either } from '~/server/errors/either';

export interface AlternanceRepository {
	search(filtre: AlternanceFiltre): Promise<Either<Array<Alternance>>>
	get(id: string, rome: string): Promise<Either<Alternance>>
}
