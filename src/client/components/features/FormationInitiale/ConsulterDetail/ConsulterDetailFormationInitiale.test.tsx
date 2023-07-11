/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';

import {
	ConsulterDetailFormationInitiale,
} from '~/client/components/features/FormationInitiale/ConsulterDetail/ConsulterDetailFormationInitiale';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { aFormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale.fixture';

describe('ConsulterDetailFormationInitiale', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('je vois le titre', () => {
		render(<ConsulterDetailFormationInitiale
			formationInitialeDetail={aFormationInitialeDetail({ libelle: 'Je suis le titre' })}
		/>);

		expect(screen.getByRole('heading', { level: 1, name: 'Je suis le titre' })).toBeVisible();
	});

	it('je vois les tags', () => {
		render(<ConsulterDetailFormationInitiale
			formationInitialeDetail={aFormationInitialeDetail({ tags: ['Certifiante', 'Bac + 2', '2 ans'] })}
		/>);

		const tagsList = within(screen.getByRole('list')).getAllByRole('listitem');
		expect(tagsList.length).toBe(3);
		expect(tagsList[0]).toHaveTextContent('Certifiante');
		expect(tagsList[1]).toHaveTextContent('Bac + 2');
		expect(tagsList[2]).toHaveTextContent('2 ans');
	});
});
