import withJoi from 'next-joi';

import { LoggerService } from '~/server/services/logger.service';

export const validate = withJoi({
  /**
   * By default, `next-joi` will return a 400 HTTP error code but
   * we can customize the error response.
   */
  onValidationError: (_, res) => {
    LoggerService.warn('[QUERY PARAMS URL] les paramètres dans l\'url ne respectent pas le schema de validation');
    return res.status(400).json({ error:  'les paramètres dans l\'url ne respectent pas le schema de validation' });
  },
});
