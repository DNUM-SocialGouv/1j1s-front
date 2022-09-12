import { MesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';

import { aCartesMesuresJeunesList } from './mesuresJeunes.fixture';

export function aMesuresEmployeurs(): MesuresEmployeurs {
  return {
    dispositifs: aCartesMesuresJeunesList(),
  };
}


