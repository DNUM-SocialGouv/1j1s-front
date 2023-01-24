/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DescriptionDuLogement } from '~/client/components/features/Logement/Consulter/DescriptionDuLogement';

describe('<DescriptionDuLogement />', () => {
	it('affiche la description du logement', () => {
		const description = "C'est un super logement !";

		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);
		const titreSection = screen.getByRole('heading', {
			level: 2,
			name: /Description du logement/i,
		});
		const contenu = screen.getByText(/C'est un super logement !/i);

		expect(titreSection).toBeVisible();
		expect(contenu).toBeVisible();
	});
	it('crop la description à 450 symboles si elle dépasse les 650 symboles', () => {
		const description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin| Ceci devrait être masqué | séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut.
			`;

		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);
		const contenu = screen.getByText(/A 11 minutes à pied/i);

		expect(contenu).not.toHaveTextContent(/\| Ceci devrait être masqué \|/i);
		expect(contenu).toHaveTextContent(' …');
	});
	it('crop la description à la fin d\'un mot', () => {
		const description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire,
				ceciestunmottrèslongquicontientle450ièmesymbolemaisquineserapascoupéaumilieu mais cette partie oui.
				séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut.
			`;

		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);
		const contenu = screen.getByText(/A 11 minutes à pied/i);

		expect(contenu).toHaveTextContent(/ceciestunmottrèslongquicontientle450ièmesymbolemaisquineserapascoupéaumilieu/i);
		expect(contenu).not.toHaveTextContent('mais cette partie oui');
	});
	it('affiche un bouton pour lire la suite lorsque la description est longue', () => {
		const description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut.
			`;

		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);
		const bouton = screen.getByRole('button', { name: /Lire la suite/i });

		expect(bouton).toBeVisible();
	});
	it('masque le bouton pour lire la suite lorsque la description est courte', () => {
		const description = "C'est un super logement !";

		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);
		const bouton = screen.queryByRole('button', { name: /Lire la suite/i });

		expect(bouton).not.toBeInTheDocument();
	});
	it('affiche le reste de la description lorsqu\'on clique sur le bouton "Lire la suite"', async () => {
		await userEvent.setup();
		const description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut mais affichée quand on étend la description.
			`;
		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);

		const bouton = screen.getByRole('button', { name: /Lire la suite/i });
		await userEvent.click(bouton);

		const contenu = screen.getByText(/A 11 minutes à pied/i);
		expect(contenu).toHaveTextContent(/mais affichée quand on étend la description./i);
		expect(contenu).not.toHaveTextContent(' [...]');
	});
	it('change le texte du bouton quand la description est dépliée', async () => {
		await userEvent.setup();
		const description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut mais affichée quand on étend la description.
			`;
		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);

		const bouton = screen.getByRole('button', { name: /Lire la suite/i });
		await userEvent.click(bouton);

		expect(bouton).not.toHaveTextContent(/Lire la suite/i);
		expect(bouton).toHaveTextContent(/Afficher moins/i);
	});
	it('a les attributs aria-controls et aria-expanded', async () => {
		const description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut mais affichée quand on étend la description.
			`;

		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);

		const bouton = screen.getByRole('button', { name: /Lire la suite/i });
		const contenu = screen.getByText(/A 11 minutes à pied/i);
		expect(bouton).toHaveAttribute('aria-expanded', 'false');
		expect(bouton).toHaveAttribute('aria-controls', contenu.id);
	});
	it('passe l\'attribut aria-expanded à true quand la description est étendue', async () => {
		await userEvent.setup();
		const description = `
				A 11 minutes à pied et 8 minutes en PC de l’université paris-dauphine, vous serez à un saut de lit de vos cours
				dans une studette calme, entièrement rénovée et meublée.Le logement, pour une personne, est luxueux, confortable,
				calme et douillet. Il comprend une penderie et de nombreux rangements ouverts, un coin douche à l’italienne avec
				lave mains, un wc sanibroyeur, un coin cuisine avec micro-ondes, frigidaire, plaques de cuisson, un bar et un
				coin séjour/nuit avec TV.Le prix comprend toutes les charges y compris l'électricité, l’eau, internet, la TV, etc.
				Les fêtes et le bruit sont interdits dans ce logement de haut standing. Cette description est beaucoup trop longue
				et sa fin sera donc masquée par défaut mais affichée quand on étend la description.
			`;
		render(<DescriptionDuLogement>{description}</DescriptionDuLogement>);

		const bouton = screen.getByRole('button', { name: /Lire la suite/i });
		await userEvent.click(bouton);

		expect(bouton).toHaveAttribute('aria-expanded', 'true');
	});
});
