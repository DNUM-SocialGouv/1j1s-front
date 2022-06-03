import { IdeaType } from '~/server/alternances/domain/alternance';

export class AlternanceNotFoundException extends Error {
  constructor(id: string, ideaType: IdeaType) {
    super(`Cannot find alternance with id ${id} in ${ideaType}`);
    this.name = 'AlternanceNotFoundException';
  }
}
