/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	ListeResultatsStage3eme,
} from '~/client/components/features/Stages3eme/FormulaireRecherche/ListeResultatsStage3eme';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';

describe('<ListeResultatsStage3eme />', () => {
	it('affiche la liste des résultats', () => {
		mockSmallScreen();
		// GIVEN
		const resultatRecherche = {
			nombreDeResultats: 4,
			resultats: [
				aStage3eme({
					adresse: {
						codeDepartement: '75',
						codePostal: '75000',
						ligne: '1 rue de la Paix',
						ville: 'Paris',
					},
					candidatureSpontanee: true,
					domaine: 'Informatique',
					modeDeContact: 'Candidature en personne',
					nomEntreprise: 'Entreprise 1',
					nombreDeSalaries: '1-9',
				}),
				aStage3eme({
					adresse: {
						codeDepartement: '75',
						codePostal: '75000',
						ligne: '2 rue de la Paix',
						ville: 'Paris',
					},
					candidatureSpontanee: false,
					domaine: 'Informatique',
					modeDeContact: 'Candidature par e-mail',
					nomEntreprise: 'Entreprise 2',
					nombreDeSalaries: '',
				}),
				aStage3eme({
					adresse: {
						codeDepartement: '75',
						codePostal: '75000',
						ligne: '3 rue de la Paix',
						ville: 'Paris',
					},
					candidatureSpontanee: false,
					domaine: 'Informatique',
					modeDeContact: 'Candidature par téléphone',
					nomEntreprise: 'Entreprise 3',
					nombreDeSalaries: undefined,
				}),
				aStage3eme({
					adresse: {
						codeDepartement: '75',
						codePostal: '75000',
						ligne: '4 rue de la Paix',
						ville: 'Paris',
					},
					candidatureSpontanee: false,
					domaine: 'Informatique',
					modeDeContact: undefined,
					nomEntreprise: 'Entreprise 4',
					nombreDeSalaries: undefined,
				}),
			],
		};
		
		// WHEN
		render(<ListeResultatsStage3eme resultatList={resultatRecherche} />);
		
		// THEN
		const resultatsUl = screen.getByRole('list', { name: 'Stages de 3ème' });
		expect(resultatsUl).toBeInTheDocument();
		// eslint-disable-next-line testing-library/no-node-access
		const resultats = resultatsUl.children;
		expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
		expect(resultats[0]).toHaveTextContent('Entreprise 1');
		expect(resultats[0]).toHaveTextContent('Informatique');
		expect(resultats[0]).toHaveTextContent('1 rue de la Paix');
		expect(resultats[0]).toHaveTextContent('75000 Paris');
		expect(resultats[0]).toHaveTextContent('1-9 salariés');
		expect(resultats[0]).toHaveTextContent('Candidature spontanée');
		expect(resultats[0]).toHaveTextContent('Candidature en personne');
		expect(resultats[1]).toHaveTextContent('Entreprise 2');
		expect(resultats[1]).toHaveTextContent('Informatique');
		expect(resultats[1]).toHaveTextContent('2 rue de la Paix');
		expect(resultats[1]).toHaveTextContent('75000 Paris');
		expect(resultats[1]).not.toHaveTextContent('Candidature spontanée');
		expect(resultats[1]).toHaveTextContent('Candidature par e-mail');
		expect(resultats[2]).toHaveTextContent('Entreprise 3');
		expect(resultats[2]).toHaveTextContent('Informatique');
		expect(resultats[2]).toHaveTextContent('3 rue de la Paix');
		expect(resultats[2]).toHaveTextContent('75000 Paris');
		expect(resultats[2]).not.toHaveTextContent('Candidature spontanée');
		expect(resultats[2]).toHaveTextContent('Candidature par téléphone');
		expect(resultats[3]).toHaveTextContent('Entreprise 4');
		expect(resultats[3]).toHaveTextContent('Informatique');
		expect(resultats[3]).toHaveTextContent('4 rue de la Paix');
		expect(resultats[3]).toHaveTextContent('75000 Paris');
		expect(resultats[3]).not.toHaveTextContent('Candidature spontanée');
	});
});
