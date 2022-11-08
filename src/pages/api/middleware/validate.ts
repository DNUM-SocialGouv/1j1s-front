import withJoi from 'next-joi'
import { ErreurMétier } from '~/server/errors/erreurMétier.types'

export const validate = withJoi({
  /**
   * By default, `next-joi` will return a 400 HTTP error code but
   * we can customize the error response.
   */
  onValidationError: (_, res) => {
    console.log('onValidationError', _.query)
    return res.status(400).json({ error:  'oups...' });
  },
})