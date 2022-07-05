/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';
import { mockSmallScreen } from '@tests/client/window.mock';
import {
  anAmbassadeurDuDonDeVêtementMissionSolo,
} from '@tests/fixtures/domain/missionEngagement.fixture';
import React from 'react';

import { ConsulterMissionEngagement } from '~/client/components/features/Engagement/Consulter/ConsulterMissionEngagement';

describe('ConsulterMission', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand on consulte une mission', () => {
    it('affiche l\'offre de mission', async () => {
      const offreMission = anAmbassadeurDuDonDeVêtementMissionSolo();

      render(<ConsulterMissionEngagement missionEngagement={offreMission} />);

      const nomAssociation =  screen.getByText('Ebs le relais val de seine');
      const tagList = screen.getByTestId('ÉtiquetteMissionEngagementList');

      expect(nomAssociation).toBeInTheDocument();
      expect(within(tagList).queryAllByRole('listitem')).toHaveLength(2);
    });
  });
});
