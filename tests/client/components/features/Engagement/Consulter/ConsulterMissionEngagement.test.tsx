/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';
import { mockSmallScreen } from '@tests/client/window.mock';
import {
  anAmbassadeurDuDonDeVêtementMission,
} from '@tests/fixtures/domain/missionEngagement.fixture';
import React from 'react';

import { ConsulterMissionEngagement } from '~/client/components/features/Engagement/Consulter/ConsulterMissionEngagement';

import { mockUseRouter } from '../../../../useRouter.mock';

describe('ConsulterMission', () => {
  beforeEach(() => {
    mockSmallScreen();
    mockUseRouter({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand on consulte une mission', () => {
    it('affiche l\'offre de mission', async () => {
      const offreMission = anAmbassadeurDuDonDeVêtementMission();

      render(<ConsulterMissionEngagement missionEngagement={offreMission} />);

      const nomAssociation = screen.getByText('Ebs le relais val de seine');
      const tagList = screen.getByRole('list', { name: 'Caractéristiques de la mission' });

      expect(nomAssociation).toBeInTheDocument();
      expect(within(tagList).queryAllByRole('listitem')).toHaveLength(2);
    });
  });
});
