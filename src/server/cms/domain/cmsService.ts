import { Either } from '~/server/errors/either';

export interface CmsService {
	save<Body, Response>(resource: string, body: Body): Promise<Either<Response>>

	getFirstFromCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection>>

	getCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection[]>>

	getSingleType<Response>(resource: string, query: string): Promise<Either<Response>>
}
