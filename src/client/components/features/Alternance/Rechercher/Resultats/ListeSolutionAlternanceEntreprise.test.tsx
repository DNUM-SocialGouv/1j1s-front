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

	it('je vois le tag de localisation', () => {
		const anEntreprisesList = [
			aRechercheEntrepriseAlternance({
				ville: 'Paris',
			}),
		];

		render(<ListeSolutionAlternanceEntreprise entrepriseList={anEntreprisesList}/>);

		const tagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
		const tags = within(tagsList).getAllByRole('listitem');
		expect(tags[0]).toHaveTextContent('Paris');
	});

	describe('nombre d‘employés', () => {
		it('lorsque le nombre d‘employé min et max sont égaux, voit le nombre de salariés', () => {
			const anEntreprisesList = [
				aRechercheEntrepriseAlternance({
					nombreSalariés: { max: 9, min: 9 },
				}),
			];

			render(<ListeSolutionAlternanceEntreprise entrepriseList={anEntreprisesList}/>);

			const tagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const tags = within(tagsList).getAllByRole('listitem');
			expect(tags[1]).toHaveTextContent('9 salariés');
		});

		it('lorsque le nombre d‘employé min et max sont différents, voit le nombre de salariés', () => {
			const anEntreprisesList = [
				aRechercheEntrepriseAlternance({
					nombreSalariés: { max: 9, min: 2 },
				}),
			];

			render(<ListeSolutionAlternanceEntreprise entrepriseList={anEntreprisesList}/>);

			const tagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const tags = within(tagsList).getAllByRole('listitem');
			expect(tags[1]).toHaveTextContent('2 à 9 salariés');
		});
	});

	it('lorsque la candidature est possible, je vois le tag de candidature spontanée', async () => {
		const anEntreprisesList = [
			aRechercheEntrepriseAlternance({
				candidaturePossible: true,
				nombreSalariés: { max: 9, min: 0 },
				ville: 'Paris',
			}),
		];

		render(<ListeSolutionAlternanceEntreprise entrepriseList={anEntreprisesList}/>);
		
		const tagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
		const tags = within(tagsList).getAllByRole('listitem');
		expect(tags[2]).toHaveTextContent('Candidature spontanée');
	});

	it('lorsque la candidature est impossible, je vois les tags pour contacter en direct l‘entreprise', async () => {
		const entreprisesList = [
			aRechercheEntrepriseAlternance({
				candidaturePossible: false,
				nombreSalariés: { max: 9, min: 0 },
				ville: 'Paris',
			}),
		];

		render(<ListeSolutionAlternanceEntreprise entrepriseList={entreprisesList}/>);

		const tagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
		const tags = within(tagsList).getAllByRole('listitem');
		expect(tags[2]).toHaveTextContent('Rencontre au sein de l’entreprise');
		expect(tags[3]).toHaveTextContent('Candidature sur le site de l’entreprise');
	});
});
