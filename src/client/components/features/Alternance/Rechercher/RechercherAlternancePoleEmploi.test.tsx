/**
 * @jest-environment jsdom
 */

import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import * as process from 'process';

import {
	RechercherAlternancePoleEmploi,
} from '~/client/components/features/Alternance/Rechercher/RechercherAlternancePoleEmploi';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { anOffreService } from '~/client/services/offre/offreService.fixture';
import { createSuccess } from '~/server/errors/either';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';

describe('<RechercherAlternancePoleEmploi />', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE = '0';
		mockLargeScreen();
	});
	it('affiche le nombre de résultats de la recherche avec le mot-clé', async () => {
		mockUseRouter({ query: {
			motCle: 'Boulanger',
		} });
		const offreService = anOffreService();
		(offreService.rechercherAlternance as jest.Mock).mockResolvedValue(createSuccess(aRésultatsRechercheOffre({
			nombreRésultats: 4,
		})));

		render(
			<DependenciesProvider offreService={offreService} localisationService={aLocalisationService()}>
				<RechercherAlternancePoleEmploi />
			</DependenciesProvider>,
		);
		await waitForElementToBeRemoved(() => screen.queryAllByRole('list', { name: /En cours de chargement/i }));

		const nombreResultats = screen.getByRole('heading', { level: 2, name: /4 offres d’alternances/i });
		expect(nombreResultats).toBeVisible();
		expect(nombreResultats).toHaveTextContent(/pour Boulanger/i);
	});
	it('affiche un tag avec la localisation quand présente dans les query params', async () => {
		mockUseRouter({ query: {
			libelleLocalisation: 'Paris (75)',
		} });

		render(
			<DependenciesProvider offreService={anOffreService()} localisationService={aLocalisationService()}>
				<RechercherAlternancePoleEmploi />
			</DependenciesProvider>,
		);
		await waitForElementToBeRemoved(() => screen.queryAllByRole('list', { name: /En cours de chargement/i }));

		const filtres = screen.getByRole('list', { name: /Filtres de la recherche/i });
		const tagLocalisation = within(filtres).getByRole('listitem');
		expect(tagLocalisation).toBeVisible();
		expect(tagLocalisation).toHaveTextContent(/Paris \(75\)/i);
	});
});
