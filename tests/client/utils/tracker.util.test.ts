import { push } from '@socialgouv/matomo-next';

import { trackClick } from '~/client/utils/tracker.util';

jest.mock('@socialgouv/matomo-next', () => {
  return {
    push: jest.fn(),
  };
});

describe('tracker util', () => {
  describe('trackClick', () => {
    it('appelle l\'outil d\'analytique pour pousser un evenement', () => {
      const action = 'bouton-test-matomo';

      trackClick(action);

      expect(push).toHaveBeenCalledWith([
        'trackEvent',
        'click',
        action,
      ]);
    });
  });
});
