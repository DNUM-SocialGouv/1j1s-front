/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

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
	describe('tags', () => {
		it('ajoute un tag correspondant au nombre de salariés, si l’information est présente', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 1,
				resultats: [
					aStage3eme({
						nombreDeSalaries: '42',
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eme resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3ème' });
			const tagsList = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const tagNombreDeSalariés = within(tagsList).getByText('42 salariés');
			expect(tagNombreDeSalariés).toBeVisible();
		});

		it('ajoute un tag correspondant au mode de contact, si l’information est présente', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 1,
				resultats: [
					aStage3eme({
						modeDeContact: 'Pigeon voyageur',
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eme resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3ème' });
			const tagsList = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const tagModeDeContact = within(tagsList).getByText('Pigeon voyageur');
			expect(tagModeDeContact).toBeVisible();
		});

		it('ajoute un tag correspond si l’offre est accessible aux personnes en situation de handicap', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 1,
				resultats: [
					aStage3eme({
						accessiblePersonnesEnSituationDeHandicap: true,
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eme resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3ème' });
			const tagsList = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const tagHandiAccessible = within(tagsList).getByText('Handi-accessible');
			expect(tagHandiAccessible).toBeVisible();
		});

		it('n’ajoute pas de liste de tags si aucune info à y afficher', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 1,
				resultats: [
					aStage3eme({
						accessiblePersonnesEnSituationDeHandicap: false,
						modeDeContact: undefined,
						nombreDeSalaries: undefined,
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eme resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3ème' });
			const tagsList = within(resultatsUl).queryByRole('list', { name: 'Caractéristiques de l‘offre' });

			expect(tagsList).not.toBeInTheDocument();
		});
	});
});
