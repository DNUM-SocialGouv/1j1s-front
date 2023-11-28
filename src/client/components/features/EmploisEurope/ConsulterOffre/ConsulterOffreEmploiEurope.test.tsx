/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	DetailEmploiEurope,
} from '~/client/components/features/EmploisEurope/ConsulterOffre/ConsulterOffreEmploiEurope';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { anEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope.fixture';

describe('DetailOffreEmploiEurope', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('affiche le titre de l‘offre d‘emploi si il est disponible', () => {
		const offreEmploiEurope = anEmploiEurope({ titre: 'Boulanger' });

		render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

		const titreDeLOffre = screen.getByRole('heading', { level: 1, name: 'Boulanger' });


		expect(titreDeLOffre).toBeVisible();
	});

	it('affiche \'Titre non renseigné\' si le titre de l‘offre d‘emploi est indisponible', () => {
		const offreEmploiEurope = anEmploiEurope({ titre: undefined });

		render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

		const titreDeLOffre = screen.getByRole('heading', { level: 1, name: 'Offre d’emploi sans titre' });


		expect(titreDeLOffre).toBeVisible();
	});

	it('affiche \'Titre non renseigné\' si le titre de l‘offre d‘emploi est une chaine de caractères vides', () => {
		const offreEmploiEurope = anEmploiEurope({ titre: '' });

		render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

		const titreDeLOffre = screen.getByRole('heading', { level: 1, name: 'Offre d’emploi sans titre' });


		expect(titreDeLOffre).toBeVisible();
	});

	it('affiche un le nom de l\'entreprise si il est disponible', () => {
		const offreEmploiEurope = anEmploiEurope({ nomEntreprise: 'Ma Mie d‘amour' });

		render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

		const nomDeLEntreprise = screen.getByText('Ma Mie d‘amour');


		expect(nomDeLEntreprise).toBeVisible();
	});

	it('affiche le bouton pour postuler à une offre si le lien est donné', () => {
		const offreEmploiEurope = anEmploiEurope({ urlCandidature: 'https://urlDeCandidature.com' });

		render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);


		const linkCandidature = screen.getByRole('link', { name: 'Je postule sur Eures' });

		expect(linkCandidature).toHaveAttribute('href', 'https://urlDeCandidature.com');
		expect(linkCandidature).toBeVisible();
	});

	it('n‘affiche pas le bouton pour postuler à une offre si le lien n‘est pas donné', () => {
		const offreEmploiEurope = anEmploiEurope({ urlCandidature: undefined });

		render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);


		const linkCandidature = screen.queryByRole('link', { name: 'Je postule sur Eures' });

		expect(linkCandidature).not.toBeInTheDocument();
	});
	describe('Tags', () => {
		it('si le type de contrat est présent, affiche le type de contrat', async () => {
			// GIVEN
			const offreEmploiEurope = anEmploiEurope({ typeContrat: 'Embauche directe' });
		
			// WHEN
			render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

			// THEN
			const listTags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre d‘emploi' });
			const tagTypeContrat = within(listTags).getByText('Embauche directe');
			expect(tagTypeContrat).toBeVisible();
		});

		it('si le temps de travail est présent, affiche le temps de travail', async () => {
			// GIVEN
			const offreEmploiEurope = anEmploiEurope({ tempsDeTravail: 'Temps partiel' });

			// WHEN
			render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

			// THEN
			const listTags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre d‘emploi' });
			const tagTypeContrat = within(listTags).getByText('Temps partiel');
			expect(tagTypeContrat).toBeVisible();
		});

		it('si le niveau d‘etudes est présent, affiche le niveau d‘etudes', async () => {
			// GIVEN
			const offreEmploiEurope = anEmploiEurope({ niveauEtudes: 'Niveau maîtrise (Master) ou équivalent' });

			// WHEN
			render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

			// THEN
			const listTags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre d‘emploi' });
			const tagTypeContrat = within(listTags).getByText('Niveau maîtrise (Master) ou équivalent');
			expect(tagTypeContrat).toBeVisible();
		});

		it('si le niveau d‘etudes est "Autre", n‘affiche pas le niveau d‘etudes', async () => {
			// GIVEN
			const offreEmploiEurope = anEmploiEurope({ niveauEtudes: 'Autre' });

			// WHEN
			render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

			// THEN
			const listTags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre d‘emploi' });
			const tagTypeContrat = within(listTags).queryByText('Autre');
			expect(tagTypeContrat).not.toBeInTheDocument();
		});

		describe('quand un résultat contient un pays et une ville', () => {
			it('affiche le résultat avec le pays et la ville', async () => {
				// GIVEN
				const offreEmploiEurope = anEmploiEurope({ pays: 'France', ville: 'Paris' });

				// WHEN
				render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

				// THEN
				const listTags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre d‘emploi' });
				const tagTypeContrat = within(listTags).getByText('France/Paris');
				expect(tagTypeContrat).toBeVisible();
			});
		});

		describe('quand un résultat contient un pays mais pas de ville', () => {
			it('affiche le résultat avec le pays', async () => {
				// GIVEN
				const offreEmploiEurope = anEmploiEurope({ pays: 'France', ville: undefined });

				// WHEN
				render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

				// THEN
				const listTags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre d‘emploi' });
				const tagTypeContrat = within(listTags).getByText('France');
				expect(tagTypeContrat).toBeVisible();
			});
		});

		describe('quand un résultat contient une ville mais pas de pays', () => {
			it('affiche le résultat avec la ville', async () => {
				// GIVEN
				const offreEmploiEurope = anEmploiEurope({ pays: undefined, ville: 'Paris' });

				// WHEN
				render(<DetailEmploiEurope annonceEmploiEurope={offreEmploiEurope}/>);

				// THEN
				const listTags = screen.getByRole('list', { name: 'Caractéristiques de l‘offre d‘emploi' });
				const tagTypeContrat = within(listTags).getByText('Paris');
				expect(tagTypeContrat).toBeVisible();
			});
		});
	});
	
});
