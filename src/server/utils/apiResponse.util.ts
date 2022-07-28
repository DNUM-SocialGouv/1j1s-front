import { NextApiResponse } from 'next';

import { Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

export function handleResponse<R>(résultats: Either<R>, res: NextApiResponse<R | ErrorHttpResponse>) {
  switch (résultats.instance) {
    case 'success':
      return res.status(200).json(résultats.result);
    case 'failure':
      switch(résultats.errorType) {
        case ErrorType.SERVICE_INDISPONIBLE:
          return res.status(503).json({ error: résultats.errorType });
        case ErrorType.DEMANDE_INCORRECTE:
          return res.status(400).json({ error: résultats.errorType });
        case ErrorType.CONTENU_INDISPONIBLE:
          return res.status(404).json({ error: résultats.errorType });
      }
  }
}
