/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { EspaceJeuneComponent } from '~/client/components/features/EspaceJeune/EspaceJeune';
import { mockSmallScreen } from '~/client/components/window.mock';
import { anEspaceJeune } from '~/server/cms/domain/espaceJeune.fixture';

const espaceJeune = anEspaceJeune();

describe('EspaceJeune', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('affiche les sections de l‘espace jeune', () => {
		render(<EspaceJeuneComponent espaceJeune={espaceJeune}/>);
		const vieProfessionnelle = screen.getByText('Entrée dans la vie professionnelle');
		const orienterFormer = screen.getByText('S‘orienter et se former');
		const parcoursAccompagnement = screen.getByText('Parcours d‘accompagnement');
		const aidesFinancières = screen.getByText('Aides financières');
		[vieProfessionnelle, orienterFormer, parcoursAccompagnement, aidesFinancières].map((section) => {
			expect(section).toBeInTheDocument();
		});
	});

	it('affiches les cartes espaceJeune', () => {
		render(<EspaceJeuneComponent espaceJeune={espaceJeune} />);
		const cartes = screen.getAllByTestId('carteEspaceJeune');
		expect(cartes.length).toEqual(16);
	});
});
