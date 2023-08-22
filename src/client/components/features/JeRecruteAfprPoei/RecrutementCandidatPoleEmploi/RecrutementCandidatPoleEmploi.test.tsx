/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import RecrutementCandidatPoleEmploi
	from '~/client/components/features/JeRecruteAfprPoei/RecrutementCandidatPoleEmploi/RecrutementCandidatPoleEmploi';

describe('<RecrutementCandidatPoleEmploi/>', () => {
	it('je vois le titre', () => {
		render(<RecrutementCandidatPoleEmploi/>);

		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toHaveTextContent('Je m’engage à recruter des candidats formés avec l’aide de Pôle emploi');
	});

	it('je vois la footnote', () => {
		render(<RecrutementCandidatPoleEmploi/>);

		const titre = screen.getByRole('heading', { level: 1 });
		const reference = within(titre).getByRole('link', { name: '*' });
		const footnote = screen.getByText(/POE : Préparation Opérationnelle à l’Emploi ; AFPR : Action de Formation Préalable au Recrutement/);
		const lienDeRetour = within(footnote).getByRole('link');

		expect(reference).toBeVisible();
		expect(lienDeRetour).toHaveAttribute('href', '#abreviation');
	});
	it('je peux m‘engager à recruter et completer une demande', () => {
		const LINK_M_ENGAGER_A_RECRUTER = 'https://entreprise.pole-emploi.fr/accueil/description/afpr';
		const LINK_COMPLETER_UNE_DEMANDE = 'https://entreprise.pole-emploi.fr/accueil/choixauthentification?goto=https://entreprise.pole-emploi.fr/accueil/description/afpr';

		render(<RecrutementCandidatPoleEmploi/>);

		expect(screen.getByRole('link', { name: 'M‘engager à recruter' })).toHaveAttribute('href', LINK_M_ENGAGER_A_RECRUTER);
		expect(screen.getByRole('link', { name: 'Compléter une demande' })).toHaveAttribute('href', LINK_COMPLETER_UNE_DEMANDE);
	});
});
