/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	ListeResultatsStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Rechercher/FormulaireRecherche/ListeResultatsStage3eEt2de';
import { mockSmallScreen } from '~/client/components/window.mock';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { aResultatRechercheStage3eEt2de, aStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de.fixture';

describe('<ListeResultatsStage3eEt2de />', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	describe('chaque résultat contient l’information', () =>{
		it('du nom de l’entreprise', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 2,
				resultats: [
					aStage3eEt2de({
						nomEntreprise: 'Entreprise 1',
					}),
					aStage3eEt2de({
						nomEntreprise: 'Entreprise 2',
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
			expect(resultatsUl).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl.children;
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('Entreprise 1');
			expect(resultats[1]).toHaveTextContent('Entreprise 2');
		});
		it('du domaine d’activité', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 2,
				resultats: [
					aStage3eEt2de({
						domaine: 'Informatique',
					}),
					aStage3eEt2de({
						domaine: 'Mécanique',
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
			expect(resultatsUl).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl.children;
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('Informatique');
			expect(resultats[1]).toHaveTextContent('Mécanique');
		});
		it('des metiers proposés', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 2,
				resultats: [
					aStage3eEt2de({
						appellationLibelle: ['Métier 1', 'Métier 2'],
					}),
					aStage3eEt2de({
						appellationLibelle: ['Métier 3', 'Métier 4'],
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
			expect(resultatsUl).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl.children;
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('Métier 1, Métier 2');
			expect(resultats[1]).toHaveTextContent('Métier 3, Métier 4');
		});
		it('de l’adresse', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 2,
				resultats: [
					aStage3eEt2de({
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							rueEtNumero: '1 rue de la Paix',
							ville: 'Paris',
						},
					}),
					aStage3eEt2de({
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
			render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
			expect(resultatsUl).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl.children;
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('1 rue de la Paix');
			expect(resultats[0]).toHaveTextContent('75000 Paris');
			expect(resultats[1]).toHaveTextContent('2 rue de la Paix');
			expect(resultats[1]).toHaveTextContent('75000 Paris');
		});
		it('un lien pour candidater', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 2,
				resultats: [
					aStage3eEt2de({
						appellationCodes: ['1234', '5678'],
						modeDeContact: ModeDeContact.IN_PERSON,
						nomEntreprise: 'Entreprise 1',
						siret: '12345678912345',
					}),
					aStage3eEt2de({
						appellationCodes: ['1236', '5679'],
						modeDeContact: ModeDeContact.EMAIL,
						nomEntreprise: 'Entreprise 2',
						siret: '12345678912346',
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
			const lienCandidature = within(resultatsUl).getAllByRole('link', { name: 'Candidater' });
			expect(lienCandidature).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(lienCandidature[0]).toHaveAttribute('href', '/stages-3e-et-2de/candidater?appellationCodes=1234%2C5678&modeDeContact=IN_PERSON&nomEntreprise=Entreprise+1&siret=12345678912345');
			expect(lienCandidature[1]).toHaveAttribute('href', '/stages-3e-et-2de/candidater?appellationCodes=1236%2C5679&modeDeContact=EMAIL&nomEntreprise=Entreprise+2&siret=12345678912346');
		});

		describe('lorsque le mode de contact est inconnu', () => {
			it('le lien pour candidater n’est pas affiché', () => {
				// GIVEN
				const resultatRecherche = aResultatRechercheStage3eEt2de({
					nombreDeResultats: 1,
					resultats: [
						aStage3eEt2de({
							modeDeContact: ModeDeContact.IN_PERSON,
						}),
						aStage3eEt2de({
							modeDeContact: undefined,
						}),
					],
				});

				// WHEN
				render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

				// THEN
				const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
				const lienCandidature = within(resultatsUl).queryAllByRole('link', { name: 'Candidater' });
				expect(lienCandidature).toHaveLength(1);
			});
		});
	});
	describe('tags', () => {
		it('ajoute un tag correspondant au nombre de salariés, si l’information est présente', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 1,
				resultats: [
					aStage3eEt2de({
						nombreDeSalaries: '42',
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
			const tagsList = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const tagNombreDeSalariés = within(tagsList).getByText('42 salariés');
			expect(tagNombreDeSalariés).toBeVisible();
		});

		describe('ajoute un tag correspondant au mode de contact', () => {
			it('si la candidature se fait en personne ajoute "Candidature en personne"', () => {
				// GIVEN
				const resultatRecherche = aResultatRechercheStage3eEt2de({
					nombreDeResultats: 1,
					resultats: [
						aStage3eEt2de({
							modeDeContact: ModeDeContact.IN_PERSON,
						}),
					],
				});

				// WHEN
				render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

				// THEN
				const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
				const tagsList = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
				const tagModeDeContact = within(tagsList).getByText('Candidature en personne');
				expect(tagModeDeContact).toBeVisible();
			});
			it('si la candidature se fait par e-mail ajoute "Candidature par e-mail', () => {
				// GIVEN
				const resultatRecherche = aResultatRechercheStage3eEt2de({
					nombreDeResultats: 1,
					resultats: [
						aStage3eEt2de({
							modeDeContact: ModeDeContact.EMAIL,
						}),
					],
				});

				// WHEN
				render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

				// THEN
				const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
				const tagsList = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
				const tagModeDeContact = within(tagsList).getByText('Candidature par e-mail');
				expect(tagModeDeContact).toBeVisible();
			});
			it('si la candidature se fait par téléphone ajoute "Candidature par téléphone"', () => {
				// GIVEN
				const resultatRecherche = aResultatRechercheStage3eEt2de({
					nombreDeResultats: 1,
					resultats: [
						aStage3eEt2de({
							modeDeContact: ModeDeContact.PHONE,
						}),
					],
				});

				// WHEN
				render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

				// THEN
				const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
				const tagsList = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
				const tagModeDeContact = within(tagsList).getByText('Candidature par téléphone');
				expect(tagModeDeContact).toBeVisible();
			});
			it('si l’information n’est pas connue n’ajoute pas de tag', () => {
				// GIVEN
				const resultatRecherche = aResultatRechercheStage3eEt2de({
					nombreDeResultats: 1,
					resultats: [
						aStage3eEt2de({
							modeDeContact: undefined,
						}),
					],
				});

				// WHEN
				render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

				// THEN
				const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
				const tagsUl = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
				const tagModeDeContactTel = within(tagsUl).queryByText('Candidature par téléphone');
				const tagModeDeContactEmail = within(tagsUl).queryByText('Candidature par e-mail');
				const tagModeDeContactEnPersonne = within(tagsUl).queryByText('Candidature en personne');
				expect(tagModeDeContactTel).not.toBeInTheDocument();
				expect(tagModeDeContactEmail).not.toBeInTheDocument();
				expect(tagModeDeContactEnPersonne).not.toBeInTheDocument();
			});
		});

		it('ajoute un tag correspond si l’offre est accessible aux personnes en situation de handicap', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 1,
				resultats: [
					aStage3eEt2de({
						accessiblePersonnesEnSituationDeHandicap: true,
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
			const tagsList = within(resultatsUl).getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const tagHandiAccessible = within(tagsList).getByText('Handi-accessible');
			expect(tagHandiAccessible).toBeVisible();
		});

		it('n’ajoute pas de liste de tags si aucune info à y afficher', () => {
			// GIVEN
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 1,
				resultats: [
					aStage3eEt2de({
						accessiblePersonnesEnSituationDeHandicap: false,
						modeDeContact: undefined,
						nombreDeSalaries: undefined,
					}),
				],
			});

			// WHEN
			render(<ListeResultatsStage3eEt2de resultatList={resultatRecherche} />);

			// THEN
			const resultatsUl = screen.getByRole('list', { name: 'Stages de 3e et 2de' });
			const tagsList = within(resultatsUl).queryByRole('list', { name: 'Caractéristiques de l‘offre' });

			expect(tagsList).not.toBeInTheDocument();
		});
	});
});
