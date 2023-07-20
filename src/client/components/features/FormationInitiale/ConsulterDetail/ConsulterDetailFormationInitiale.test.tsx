/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';

import {
	ConsulterDetailFormationInitiale,
} from '~/client/components/features/FormationInitiale/ConsulterDetail/ConsulterDetailFormationInitiale';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { aFormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.fixture';
import { aFormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale.fixture';
import { queries } from '~/test-utils';

describe('ConsulterDetailFormationInitiale', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('je vois le titre', () => {
		const formationInitialeDetail =aFormationInitialeDetail({ libelle: 'Je suis le titre' });
		const formationInitialeDetailCMS = aFormationInitialeDetailCMS();
		render(<ConsulterDetailFormationInitiale
			formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}
		/>);

		expect(screen.getByRole('heading', { level: 1, name: 'Je suis le titre' })).toBeVisible();
	});

	it('je vois les tags', () => {
		const formationInitialeDetail =aFormationInitialeDetail({ tags: ['Certifiante', 'Bac + 2', '2 ans'] });
		const formationInitialeDetailCMS = aFormationInitialeDetailCMS();
		
		render(<ConsulterDetailFormationInitiale
			formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}
		/>);

		const tagsList = within(screen.getByRole('list')).getAllByRole('listitem');
		expect(tagsList.length).toBe(3);
		expect(tagsList[0]).toHaveTextContent('Certifiante');
		expect(tagsList[1]).toHaveTextContent('Bac + 2');
		expect(tagsList[2]).toHaveTextContent('2 ans');
	});

	describe('la description', () => {
		const descriptionText = 'C‘est une description';
		it('si la description est disponible, je la vois', () => {
			const formationInitialeDetail = aFormationInitialeDetail();
			const formationInitialeDetailCMS = aFormationInitialeDetailCMS({ description: descriptionText });

			const { getByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}/>, { queries });

			const description = getByDescriptionTerm('Description');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent(descriptionText);
		});
		
		it('si la description n‘est pas disponible, je ne la vois pas', () => {
			const formationInitialeDetail = aFormationInitialeDetail();
			const formationInitialeDetailCMS = aFormationInitialeDetailCMS({ description: undefined });

			const { queryByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}/>, { queries });

			expect(queryByDescriptionTerm('Description')).not.toBeInTheDocument();
		});
	});
	
	describe('les attendus Parcoursup', () => {
		const attendusParcoursup = 'les attendus Parcoursup';
		it('si les attendus Parcoursup sont disponibles, je les vois', () => {
			const formationInitialeDetail = aFormationInitialeDetail();
			const formationInitialeDetailCMS = aFormationInitialeDetailCMS({ attendusParcoursup: attendusParcoursup });

			const { getByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}/>, { queries });

			const description = getByDescriptionTerm('Attendus Parcoursup');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent(attendusParcoursup);
		});
		
		it('si les attendus Parcoursup ne sont pas disponibles, je ne les vois pas', () => {
			const formationInitialeDetail = aFormationInitialeDetail();
			const formationInitialeDetailCMS = aFormationInitialeDetailCMS({ attendusParcoursup: undefined });

			const { queryByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}/>, { queries });

			expect(queryByDescriptionTerm('Attendus Parcoursup')).not.toBeInTheDocument();
		});
	});
	
	describe('les conditions d‘accès', () => {
		const conditionsAcces = 'les conditions d‘accès';
		it('si les conditions d‘accès sont disponibles, je les vois', () => {
			const formationInitialeDetail = aFormationInitialeDetail();
			const formationInitialeDetailCMS = aFormationInitialeDetailCMS({ conditionsAcces: conditionsAcces });

			const { getByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}/>, { queries });

			const description = getByDescriptionTerm('Conditions d‘accès');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent(conditionsAcces);
		});
		
		it('si les attendus Parcoursup ne sont pas disponibles, je ne les vois pas', () => {
			const formationInitialeDetail = aFormationInitialeDetail();
			const formationInitialeDetailCMS = aFormationInitialeDetailCMS({ conditionsAcces: undefined });

			const { queryByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}/>, { queries });

			expect(queryByDescriptionTerm('Conditions d‘accès')).not.toBeInTheDocument();
		});
	});
	
	describe('la poursuite d‘étude', () => {
		const poursuiteEtudes = 'la poursuite d‘étude';
		it('si la poursuite d‘étude est disponible, je la vois', () => {
			const formationInitialeDetail = aFormationInitialeDetail();
			const formationInitialeDetailCMS = aFormationInitialeDetailCMS({ poursuiteEtudes: poursuiteEtudes });

			const { getByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}/>, { queries });

			const description = getByDescriptionTerm('Poursuite d‘études');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent(poursuiteEtudes);
		});
		
		it('si la poursuite d‘étude n‘est pas disponible, je ne la vois pas', () => {
			const formationInitialeDetail = aFormationInitialeDetail();
			const formationInitialeDetailCMS = aFormationInitialeDetailCMS({ poursuiteEtudes: undefined });

			const { queryByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={{ ...formationInitialeDetail, ...formationInitialeDetailCMS }}/>, { queries });

			expect(queryByDescriptionTerm('Poursuite d‘études')).not.toBeInTheDocument();
		});
	});
});
