/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConsulterAnnonce } from '~/client/components/features/Logement/Consulter/ConsulterAnnonce';
import { uneAnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.fixture';

describe('<ConsulterAnnonce />', () => {
	it("affiche le titre de l'annonce", async () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.titre = 'Super T3 dans le centre de Paris';

		await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const titre = screen.getByRole('heading', {
			level: 1,
		});

		expect(titre).toBeVisible();
		expect(titre).toHaveTextContent('Super T3 dans le centre de Paris');
	});
	it('affiche le type de logement', async () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.type = 'Location';
		annonceDeLogement.typeBien = 'Appartement';

		await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const type = screen.getByText(/Location - Appartement/i);

		expect(type).toBeVisible();
	});
	it('affiche la date de mise à jour au bon format', async () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.dateDeMiseAJour = new Date(2020, 1, 1).toISOString();

		await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const date = screen.getByText(/Annonce mise à jour le/i);

		expect(date).toBeVisible();
		expect(date).toHaveTextContent(/Annonce mise à jour le 01.02.2020/i);
	});
	describe('description du logement', () => {
		it('affiche la description du logement', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = "C'est un super logement !";

			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const titreSection = screen.getByRole('heading', {
				level: 2,
				name: /Description du logement/i,
			});
			const description = screen.getByText(/C'est un super logement !/i);

			expect(titreSection).toBeVisible();
			expect(description).toBeVisible();
		});
		it('crop la description à 450 symboles si elle dépasse les 650 symboles', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin| Ceci devrait être masqué | séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut.
			`;

			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const description = screen.getByText(/A 11 minutes à pied/i);

			expect(description).not.toHaveTextContent(/\| Ceci devrait être masqué \|/i);
			expect(description).toHaveTextContent(' [...]');
		});
		it('crop la description à la fin d\'un mot', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire,
				ceciestunmottrèslongquicontientle450ièmesymbolemaisquineserapascoupéaumilieu mais cette partie oui.
				séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut.
			`;

			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const description = screen.getByText(/A 11 minutes à pied/i);

			expect(description).toHaveTextContent(/ceciestunmottrèslongquicontientle450ièmesymbolemaisquineserapascoupéaumilieu/i);
			expect(description).not.toHaveTextContent('mais cette partie oui');
		});
		it('affiche un bouton pour lire la suite lorsque la description est longue', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut.
			`;

			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const bouton = screen.getByRole('button', { name: /Lire la suite/i });

			expect(bouton).toBeVisible();
		});
		it('masque le bouton pour lire la suite lorsque la description est courte', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = "C'est un super logement !";

			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const bouton = screen.queryByRole('button', { name: /Lire la suite/i });

			expect(bouton).not.toBeInTheDocument();
		});
		it('affiche le reste de la description lorsqu\'on clique sur le bouton "Lire la suite"', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut mais affichée quand on étend la description.
			`;
			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);

			const bouton = screen.getByRole('button', { name: /Lire la suite/i });
			await userEvent.click(bouton);

			const description = screen.getByText(/A 11 minutes à pied/i);
			expect(description).toHaveTextContent(/mais affichée quand on étend la description./i);
			expect(description).not.toHaveTextContent(' [...]');
		});
		it('change le texte du bouton quand la description est dépliée', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut mais affichée quand on étend la description.
			`;
			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);

			const bouton = screen.getByRole('button', { name: /Lire la suite/i });
			await userEvent.click(bouton);

			expect(bouton).not.toHaveTextContent(/Lire la suite/i);
			expect(bouton).toHaveTextContent(/Afficher moins/i);
		});
		it('a les attributs aria-controls et aria-expanded', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut mais affichée quand on étend la description.
			`;

			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);

			const bouton = screen.getByRole('button', { name: /Lire la suite/i });
			const description = screen.getByText(/A 11 minutes à pied/i);
			expect(bouton).toHaveAttribute('aria-expanded', 'false');
			expect(bouton).toHaveAttribute('aria-controls', description.id);
		});
		it('passe l\'attribut aria-expanded à true quand la description est étendue', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut mais affichée quand on étend la description.
			`;
			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);

			const bouton = screen.getByRole('button', { name: /Lire la suite/i });
			await userEvent.click(bouton);

			expect(bouton).toHaveAttribute('aria-expanded', 'true');
		});
	});
});
