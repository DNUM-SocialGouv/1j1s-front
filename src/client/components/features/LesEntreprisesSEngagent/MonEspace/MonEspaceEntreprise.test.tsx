/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { MonEspaceEntreprise } from '~/client/components/features/LesEntreprisesSEngagent/MonEspace/MonEspaceEntreprise';

describe('<MonEspaceEntreprise/>', () => {
	it('l‘utilisateur voit les liens de redirection', () => {
		process.env = {
			...process.env,
			NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL: 'https://url-lba.com/',
		};
		render(<MonEspaceEntreprise/>);
		const linkConnexion = screen.getAllByRole('link', { name: 'Se connecter - nouvelle fenêtre' });
		expect(linkConnexion[0]).toBeVisible();
		expect(linkConnexion[0]).toHaveAttribute('href', 'https://www.lesentreprises-sengagent.gouv.fr/login');

		expect(linkConnexion[1]).toBeVisible();
		expect(linkConnexion[1]).toHaveAttribute('href', 'https://url-lba.com/espace-pro/authentification');

		const linkInscription = screen.getByRole('link', { name: 'Pas encore inscrit ? Rejoignez la mobilisation' });
		expect(linkInscription).toBeVisible();
		expect(linkInscription).toHaveAttribute('href', '/les-entreprises-s-engagent');
	});
});




