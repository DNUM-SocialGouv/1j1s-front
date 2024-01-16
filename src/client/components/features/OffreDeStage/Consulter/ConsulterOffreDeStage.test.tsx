/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { OffreDeStage } from '~/server/stages/domain/stages';
import { anOffreDeStage, anOffreDeStageLocalisation } from '~/server/stages/domain/stages.fixture';
import { DomainesStage } from '~/server/stages/repository/domainesStage';
import { queries } from '~/test-utils';

describe('ConsulterOffreDeStage', () => {
	const offreDeStage: OffreDeStage = anOffreDeStage({
		dateDeDebutMax: '2024-09-01',
		dateDeDebutMin: '2024-09-01',
		description: 'stage en graphisme description',
		domaines: [],
		dureeEnJour: 180,
		dureeEnJourMax: 180,
		employeur: {
			description: 'Je suis une description de l‘employeur',
			logoUrl: '',
			nom: 'Nom de l‘employeur',
			siteUrl: '',
		},
		id: '1111',
		localisation: {
			codePostal: '75001',
			departement: '75',
			pays: 'FR',
			region: 'IDF',
			ville: 'Paris',
		},
		remunerationBase: 1500,
		slug: 'stage-en-graphisme',
		teletravailPossible: true,
		titre: 'stage en graphisme',
		urlDeCandidature: 'http://candidature',
	});

	beforeEach(() => {
		mockUseRouter({});
	});

	describe('affiche l’offre de stage avec les bonnes informations', () => {
		it('affiche le nom du stage', () => {
			render(<ConsulterOffreDeStage offreDeStage={anOffreDeStage({ titre:'stage en graphisme' })}/>);

			const intituléOffreDeStage = screen.getByText('stage en graphisme');

			expect(intituléOffreDeStage).toBeVisible();
		});

		it('affiche le nom de l‘employeur', () => {
			render(<ConsulterOffreDeStage offreDeStage={anOffreDeStage({ employeur: { nom: 'Je suis le nom de l‘employeur' } })}/>);

			const nomEntreprise = screen.getByText('Je suis le nom de l‘employeur');

			expect(nomEntreprise).toBeVisible();
		});

		describe('description du poste', () => {
			it('quand elle est fournie, affiche la description du poste', () => {
				const { getByDescriptionTerm } = render(<ConsulterOffreDeStage offreDeStage={anOffreDeStage({
					description: 'Je suis une description du poste',
				})}/>, { queries });

				const descriptionPoste = getByDescriptionTerm('Description du poste :');

				expect(descriptionPoste).toBeVisible();
				expect(descriptionPoste).toHaveTextContent('Je suis une description du poste');
			});

			it('quand elle n‘est pas fournie, n‘affiche pas la description du poste', () => {
				render(<ConsulterOffreDeStage offreDeStage={anOffreDeStage({
					description: '',
				})}/>);

				const descriptionPoste = screen.queryByText('Description du poste :');

				expect(descriptionPoste).not.toBeInTheDocument();
			});
		});
		
		describe('description de l‘employeur', () => {
			it('lorsqu‘elle est fournie, affiche la description de l‘employeur', () => {
				const { getByDescriptionTerm } = render(<ConsulterOffreDeStage offreDeStage={anOffreDeStage({
					employeur: {
						description: 'Je suis une description de l‘employeur',
						nom: 'nom',
					},
				})}/>, { queries });

				const descriptionEmployeur = getByDescriptionTerm('Description de l‘employeur :');

				expect(descriptionEmployeur).toBeVisible();
				expect(descriptionEmployeur).toHaveTextContent('Je suis une description de l‘employeur');
			});

			it('quand elle n‘est pas fournie, n‘affiche pas la description de l‘employeur', () => {
				render(<ConsulterOffreDeStage offreDeStage={anOffreDeStage({
					employeur: {
						description: '',
						nom: 'nom',
					},
				})}/>);

				const descriptionPoste = screen.queryByText('Description de l‘employeur :');

				expect(descriptionPoste).not.toBeInTheDocument();
			});
		});


		describe('la rémunération du stage', () => {
			it('Lorsque la rémunération n‘est pas renseignée affiche "Non renseignée', () => {
				const { getByDescriptionTerm } = render(<ConsulterOffreDeStage
					offreDeStage={anOffreDeStage({ remunerationBase: undefined })}/>, { queries });

				const remuneration = getByDescriptionTerm('Rémunération :');


				expect(remuneration).toBeVisible();
				expect(remuneration).toHaveTextContent('Non renseignée');
			});
			it('lorsque la rémunération est à 0, affiche "Aucune"', () => {
				const { getByDescriptionTerm } = render(<ConsulterOffreDeStage
					offreDeStage={anOffreDeStage({ remunerationBase: 0 })}/>, { queries });

				const remunération = getByDescriptionTerm('Rémunération :');


				expect(remunération).toBeVisible();
				expect(remunération).toHaveTextContent('Aucune');
			});
			it('lorsque la rémunération est proposée affiche la somme de la rémunération', () => {
				const { getByDescriptionTerm } = render(<ConsulterOffreDeStage
					offreDeStage={anOffreDeStage({ remunerationBase: 150 })}/>, { queries });

				const remuneration = getByDescriptionTerm('Rémunération :');


				expect(remuneration).toBeVisible();
				expect(remuneration).toHaveTextContent('150 €');
			});
		});

		describe('dans les étiquettes', () => {
			it('concernant les domaines du stage', () => {
				const offreDeStage = anOffreDeStage({ domaines: [DomainesStage.ACHAT, DomainesStage.CONSEIL] });

				render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

				const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
				const displayedTagsTextContents = within(displayedTagsList).getAllByRole('listitem').map((listItem) => listItem.textContent);
				expect(displayedTagsTextContents).toContain(DomainesStage.ACHAT);
				expect(displayedTagsTextContents).toContain(DomainesStage.CONSEIL);
			});
			
			describe('concernant la localisation du stage', () => {
				it('affiche la ville du stage quand elle est présente', () => {
					const localisation = anOffreDeStageLocalisation({ ville: 'Paris' });
					const offreDeStage = anOffreDeStage({ localisation: localisation });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const displayedTagsTextContents = within(displayedTagsList).getAllByRole('listitem').map((listItem) => listItem.textContent);
					expect(displayedTagsTextContents).toContain(localisation.ville);
				});

				it('quand la ville du stage n’est pas présente, affiche le département si présent', () => {
					const localisation = anOffreDeStageLocalisation({ departement: 'Val de marne' });
					const offreDeStage = anOffreDeStage({ localisation: localisation });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const displayedTagsTextContents = within(displayedTagsList).getAllByRole('listitem').map((listItem) => listItem.textContent);
					expect(displayedTagsTextContents).toContain(localisation.departement);
				});

				it('quand la ville et le département du stage ne sont pas présents, affiche la région si présente', () => {
					const localisation = anOffreDeStageLocalisation({ region: 'Ile de France' });
					const offreDeStage = anOffreDeStage({ localisation: localisation });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const displayedTagsTextContents = within(displayedTagsList).getAllByRole('listitem').map((listItem) => listItem.textContent);
					expect(displayedTagsTextContents).toContain(localisation.region);
				});
			});
			describe('concernant la durée du stage', () => {
				it('affiche une durée catégorisée quand elle est supérieure à 0', () => {
					const offreDeStage = anOffreDeStage({ dureeEnJour: 60 });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const displayedTagsTextContents = within(displayedTagsList).getAllByRole('listitem').map((listItem) => listItem.textContent);
					expect(displayedTagsTextContents).toContain('2 mois');
				});
			});
			describe('concernant la date de début du stage', () => {
				it('affiche la date de début précise quand il y a une date précise', () => {
					const offreDeStage = anOffreDeStage({ dateDeDebutMax: '2024-09-01', dateDeDebutMin: '2024-09-01' });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const tags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const tagDateDebut = within(tags).getAllByRole('listitem')
						.find((listItem) => listItem.textContent === 'Débute le : 9/1/2024');
					expect(tagDateDebut).toBeVisible();
				});
				it('affiche la période de date de début quand la date de début est une période de date', () => {
					const offreDeStage = anOffreDeStage({ dateDeDebutMax: '2024-09-30', dateDeDebutMin: '2024-09-01' });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const tags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const tagDateDebut = within(tags).getAllByRole('listitem')
						.find((listItem) => listItem.textContent === 'Débute entre le : 9/1/2024 et 9/30/2024');
					expect(tagDateDebut).toBeVisible();
				});
				it('n’affiche pas le tag de date de début quand il n‘y a pas de date de début', () => {
					const offreDeStage = anOffreDeStage({ dateDeDebutMin: undefined });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const tags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const tagDateDebut = within(tags).getAllByRole('listitem')
						.find((listItem) => listItem.textContent?.includes('Débute le')) ?? null;
					expect(tagDateDebut).not.toBeInTheDocument();
				});
			});
		});
	});

	it('permet de postuler à l‘offre de stage', () => {
		render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

		const linkPostulerOffreEmploi = screen.getByRole('link', { name: 'Postuler' });

		expect(linkPostulerOffreEmploi).toHaveAttribute('href', offreDeStage.urlDeCandidature);
		expect(linkPostulerOffreEmploi).toHaveAttribute('target', '_blank');
		expect(linkPostulerOffreEmploi).toHaveAttribute('title', 'Postuler - nouvelle fenêtre');
	});
});
