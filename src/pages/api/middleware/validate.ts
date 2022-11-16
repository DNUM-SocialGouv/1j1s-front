import withJoi from 'next-joi';

import { LoggerService } from '~/server/services/logger.service';

export const validate = withJoi({
  onValidationError: (_, res) => {
    LoggerService.warn('[QUERY PARAMS URL] les paramètres dans l\'url ne respectent pas le schema de validation');
    return res.status(400).json({ error:  'les paramètres dans l\'url ne respectent pas le schema de validation' });
  },
});
