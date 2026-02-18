import { render, screen, within } from '@testing-library/react';

import RecrutementCandidatFranceTravail
	from '~/client/components/features/JeRecruteAfprPoei/RecrutementCandidatFranceTravail/RecrutementCandidatFranceTravail';

describe('<RecrutementCandidatFranceTravail/>', () => {
	it('je vois le titre', () => {
		render(<RecrutementCandidatFranceTravail />);

		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toHaveTextContent('Je m’engage à recruter des candidats formés avec l’aide de France Travail');
	});

	it('je vois la footnote', () => {
		render(<RecrutementCandidatFranceTravail />);

		const titre = screen.getByRole('heading', { level: 1 });
		const reference = within(titre).getByRole('link', { name: 'note de pied de page' });
		const footnote = screen.getByText(/POE : Préparation Opérationnelle à l’Emploi ; AFPR : Action de Formation Préalable au Recrutement/);
		const lienDeRetour = within(footnote).getByRole('link');

		expect(reference).toBeVisible();
		expect(lienDeRetour).toHaveAttribute('href', '#abreviation');
	});
	it('je peux m‘engager à recruter et completer une demande', () => {
		const LINK_M_ENGAGER_A_RECRUTER = 'https://entreprise.francetravail.fr/accueil/description/afpr';
		const LINK_COMPLETER_UNE_DEMANDE = 'https://entreprise.francetravail.fr/accueil/choixauthentification?goto=https://entreprise.francetravail.fr/accueil/description/afpr';

		render(<RecrutementCandidatFranceTravail />);

		expect(screen.getByRole('link', { name: 'M‘engager à recruter - nouvelle fenêtre' })).toHaveAttribute('href', LINK_M_ENGAGER_A_RECRUTER);
		expect(screen.getByRole('link', { name: 'Compléter une demande - nouvelle fenêtre' })).toHaveAttribute('href', LINK_COMPLETER_UNE_DEMANDE);
	});
});
