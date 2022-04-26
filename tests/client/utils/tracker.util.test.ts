import { push } from '@socialgouv/matomo-next';

import Tracker from '~/client/utils/tracker.util';

jest.mock('@socialgouv/matomo-next', () => {
  return {
    push: jest.fn(),
  };
});

describe('Tracker', () => {
  describe('trackEvent', () => {
    it('appelle l\'outil d\'analytique pour pousser un evenement', () => {
      const category = 'click';
      const action = 'bouton-test-matomo';

      Tracker.trackEvent(category, action);

      expect(push).toHaveBeenCalledWith([
        Tracker.TrackerObjectEnum.TRACK_EVENT,
        category,
        action,
      ]);
    });
  });
});
