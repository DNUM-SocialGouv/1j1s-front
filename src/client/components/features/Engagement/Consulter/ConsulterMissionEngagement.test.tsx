/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { ConsulterMissionEngagement } from '~/client/components/features/Engagement/Consulter/ConsulterMissionEngagement';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import { anAmbassadeurDuDonDeVêtementMission } from '~/server/engagement/domain/missionEngagement.fixture';

describe('ConsulterMission', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand on consulte une mission', () => {
		it('affiche l‘offre de mission', async () => {
			const offreMission = anAmbassadeurDuDonDeVêtementMission();

			render(<DependenciesProvider sessionStorageService={aStorageService()}><ConsulterMissionEngagement missionEngagement={offreMission}/></DependenciesProvider>);

			const nomAssociation = screen.getByText('Ebs le relais val de seine');
			const tagList = screen.getByRole('list', {
				name: 'Caractéristiques de la mission',
			});

			expect(nomAssociation).toBeVisible();
			expect(within(tagList).queryAllByRole('listitem')).toHaveLength(2);
		});

		it('affiche un lien pour s’engager sur la mission', async () => {
			const offreMission = anAmbassadeurDuDonDeVêtementMission();

			render(<DependenciesProvider sessionStorageService={aStorageService()}><ConsulterMissionEngagement missionEngagement={offreMission}/></DependenciesProvider>);

			const lienPostuler = screen.getByRole('link', { name: 'S’engager - nouvelle fenêtre' });
			expect(lienPostuler).toBeVisible();
			expect(lienPostuler).toHaveAttribute('href', offreMission.url);
		});
	});
});
