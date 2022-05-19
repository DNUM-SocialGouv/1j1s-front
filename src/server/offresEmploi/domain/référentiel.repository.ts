import { RéférentielDomaine } from '~/server/offresEmploi/domain/référentiel';

export interface RéférentielRepository {
  getRéférentielDomaines(): Promise<RéférentielDomaine[]>
}
