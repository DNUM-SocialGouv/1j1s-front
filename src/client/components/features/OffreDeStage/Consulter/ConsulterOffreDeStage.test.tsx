/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import * as domain from 'domain';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { anOffreDeStageLocalisation, uneOffreDeStage } from '~/server/cms/domain/offreDeStage.fixture';
import { Domaines, OffreDeStage } from '~/server/cms/domain/offreDeStage.type';

describe('ConsulterOffreDeStage', () => {
	const offreDeStage: OffreDeStage = {
		dateDeDebutMax: '2024-09-01',
		dateDeDebutMin: '2024-09-01',
		description: 'stage en graphisme description',
		domaines: [],
		dureeEnJour: 180,
		dureeEnJourMax: 180,
		employeur: {
			description: '',
			logoUrl: '',
			nom: 'Gras Fisme',
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
	};

	beforeEach(() => {
		mockUseRouter({});
	});

	describe('affiche l’offre de stage avec les bonnes informations', () => {
		it('concernant l‘intitulé du stage', () => {
			render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

			const intituléOffreDeStage = screen.getByText('stage en graphisme');

			expect(intituléOffreDeStage).toBeVisible();
		});

		it('concernant l‘entreprise du stage', () => {
			render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

			const nomEntreprise = screen.getByText('Gras Fisme');

			expect(nomEntreprise).toBeVisible();
		});

		describe('dans les étiquettes', () => {
			it('pour les domaines du stage', () => {
				const offreDeStage = uneOffreDeStage({ domaines: [Domaines.ACHAT, Domaines.CONSEIL] });

				render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

				const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
				const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
				expect(displayedTagsTextContents).toContain(Domaines.ACHAT);
				expect(displayedTagsTextContents).toContain(Domaines.CONSEIL);
			});
			describe('pour la localisation du stage', () => {
				it('affiche la ville du stage quand elle est présente', () => {
					const localisation = anOffreDeStageLocalisation({ ville: 'Paris' });
					const offreDeStage = uneOffreDeStage({ localisation: localisation });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
					expect(displayedTagsTextContents).toContain(localisation.ville);
				});

				it('quand la ville du stage n’est pas présente, affiche le département si présent', () => {
					const localisation = anOffreDeStageLocalisation({ departement: 'Val de marne' });
					const offreDeStage = uneOffreDeStage({ localisation: localisation });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
					expect(displayedTagsTextContents).toContain(localisation.departement);
				});

				it('quand la ville et le département du stage ne sont pas présents, affiche la région si présente', () => {
					const localisation = anOffreDeStageLocalisation({ region: 'Ile de France' });
					const offreDeStage = uneOffreDeStage({ localisation: localisation });

					render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

					const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre de stage' });
					const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
					expect(displayedTagsTextContents).toContain(localisation.region);
				});
			});
			describe('pour la durée du stage', () => {
			  it('affiche une durée catégorisée quand elle est supérieure à 0', () => {

			  });
			});
			describe('concernant la date de début du stage', () => {

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
