/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

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
});
