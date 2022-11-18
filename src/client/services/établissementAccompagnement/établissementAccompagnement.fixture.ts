import { ÉtablissementAccompagnementService } from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { createSuccess } from '~/server/errors/either';
import {
  anÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';

export function anÉtablissementAccompagnementService(): ÉtablissementAccompagnementService {
  return {
    rechercher: jest.fn().mockResolvedValue(createSuccess(anÉtablissementAccompagnementList())),
  } as unknown as ÉtablissementAccompagnementService;
}
