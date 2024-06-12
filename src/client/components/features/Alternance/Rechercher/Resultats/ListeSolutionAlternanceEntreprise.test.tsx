/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	ListeSolutionAlternanceEntreprise,
} from '~/client/components/features/Alternance/Rechercher/Resultats/ListeSolutionAlternanceEntreprise';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aRechercheEntrepriseAlternance } from '~/server/alternances/domain/alternance.fixture';

describe('les tags', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	it('lorsque la candidature est possible, je vois les tags', async () => {
		const anEntreprisesList = [
			aRechercheEntrepriseAlternance({
				candidaturePossible: true,
				nombreSalariés: '0 à 9 salariés',
				ville: 'Paris',
			}),
		];

		render(<ListeSolutionAlternanceEntreprise entrepriseList={anEntreprisesList}/>);
		
		const tagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
		const tags = within(tagsList).getAllByRole('listitem');
		expect(tags).toHaveLength(3);
		expect(tags[0]).toHaveTextContent('Paris');
		expect(tags[1]).toHaveTextContent('0 à 9 salariés');
		expect(tags[2]).toHaveTextContent('Candidature spontanée');
	});

	it('lorsque la candidature est impossible, je vois les tags pour contacter en direct l‘entreprise', async () => {
		const entreprisesList = [
			aRechercheEntrepriseAlternance({
				candidaturePossible: false,
				nombreSalariés: '0 à 9 salariés',
				ville: 'Paris',
			}),
		];

		render(<ListeSolutionAlternanceEntreprise entrepriseList={entreprisesList}/>);

		const tagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
		const tags = within(tagsList).getAllByRole('listitem');
		expect(tags).toHaveLength(4);
		expect(tags[0]).toHaveTextContent('Paris');
		expect(tags[1]).toHaveTextContent('0 à 9 salariés');
		expect(tags[2]).toHaveTextContent('Rencontre au sein de l’entreprise');
		expect(tags[3]).toHaveTextContent('Candidature sur le site de l’entreprise');
	});
});
