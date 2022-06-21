import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';

export function aApiPoleEmploiRéférentielRepository(): ApiPoleEmploiRéférentielRepository {
  return {
    findCodeInseeInRéférentielCommune: jest.fn(),
  } as unknown as ApiPoleEmploiRéférentielRepository;
}
