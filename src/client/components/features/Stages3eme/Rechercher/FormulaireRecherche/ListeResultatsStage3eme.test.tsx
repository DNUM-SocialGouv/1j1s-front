/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	ListeResultatsStage3eme,
} from '~/client/components/features/Stages3eme/Rechercher/FormulaireRecherche/ListeResultatsStage3eme';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aResultatRechercheStage3eme, aStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';

describe('<ListeResultatsStage3eme />', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	describe('chaque résultat contient l’information', () =>{
		it('du nom de l’entreprise', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 2,
				resultats: [
					aStage3eme({
						nomEntreprise: 'Entreprise 1',
					}),
					aStage3eme({
						nomEntreprise: 'Entreprise 2',
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eme resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3ème' });
			expect(resultatsUl).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl.children;
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('Entreprise 1');
			expect(resultats[1]).toHaveTextContent('Entreprise 2');
		});
		it('du domaine d’activité', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 2,
				resultats: [
					aStage3eme({
						domaine: 'Informatique',
					}),
					aStage3eme({
						domaine: 'Mécanique',
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eme resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3ème' });
			expect(resultatsUl).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl.children;
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('Informatique');
			expect(resultats[1]).toHaveTextContent('Mécanique');
		});
		it('de l’adresse', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 2,
				resultats: [
					aStage3eme({
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							rueEtNumero: '1 rue de la Paix',
							ville: 'Paris',
						},
					}),
					aStage3eme({
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							rueEtNumero: '2 rue de la Paix',
							ville: 'Paris',
						},
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eme resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3ème' });
			expect(resultatsUl).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl.children;
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('1 rue de la Paix');
			expect(resultats[0]).toHaveTextContent('75000 Paris');
			expect(resultats[1]).toHaveTextContent('2 rue de la Paix');
			expect(resultats[1]).toHaveTextContent('75000 Paris');
		});
	});
});
