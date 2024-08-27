/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';

import {
	ConsulterDetailFormationInitiale,
} from '~/client/components/features/FormationInitiale/ConsulterDetail/ConsulterDetailFormationInitiale';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import {
	aFormationInitiale,
	aFormationInitialeDetailComplete,
} from '~/server/formations-initiales/domain/formationInitiale.fixture';
import { queries } from '~/test-utils';

describe('ConsulterDetailFormationInitiale', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('je vois le titre', () => {
		const formationInitialeDetail = aFormationInitialeDetailComplete({ libelle: 'Je suis le titre' });
		render(<ConsulterDetailFormationInitiale
			formationInitialeDetail={formationInitialeDetail}
		       />);

		expect(screen.getByRole('heading', { level: 1, name: 'Je suis le titre' })).toBeVisible();
	});

	describe('tags', () => {
		it('je vois les tags', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({
				duree: '2 ans',
				isCertifiante: true,
				niveauDeSortie: 'Bac + 2',
			});

			render(<ConsulterDetailFormationInitiale formationInitialeDetail={formationInitialeDetail}/>);

			const tagsList = within(screen.getByRole('list')).getAllByRole('listitem');
			expect(tagsList).toHaveLength(3);
			expect(tagsList[0]).toHaveTextContent('Certifiante');
			expect(tagsList[1]).toHaveTextContent('Bac + 2');
			expect(tagsList[2]).toHaveTextContent('2 ans');
		});

		it('lorsque la formation n‘est pas certifiante, je ne vois pas l‘information', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({
				duree: '2 ans',
				isCertifiante: false,
				niveauDeSortie: 'Bac + 2',
			});

			render(<ConsulterDetailFormationInitiale formationInitialeDetail={formationInitialeDetail}/>);

			const tagsList = within(screen.getByRole('list')).getAllByRole('listitem');
			expect(tagsList).toHaveLength(2);
			expect(tagsList[0]).toHaveTextContent('Bac + 2');
			expect(tagsList[1]).toHaveTextContent('2 ans');
		});

	});

	it('contient un lien vers la fiche formation du partenaire pour y découvrir les établissements proposant cette formation', () => {
		// Given
		const formationInitialeDetail = aFormationInitialeDetailComplete({ url_formation: 'https://www.onisep.fr/fiche-formation' });

		// When
		render(<ConsulterDetailFormationInitiale
			formationInitialeDetail={formationInitialeDetail}
		       />);

		// Then
		const lienVersSitePartenaire = screen.getByRole('link', { name: /Consulter les établissements/ });

		expect(lienVersSitePartenaire).toBeVisible();
		expect(lienVersSitePartenaire).toHaveAttribute('href', 'https://www.onisep.fr/fiche-formation');
	});

	describe('la description', () => {
		const descriptionText = 'C‘est une description';
		it('si la description est disponible, je la vois', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({ description: descriptionText });

			const { getByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={formationInitialeDetail}
			                                        />, { queries });

			const description = getByDescriptionTerm('Description');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent(descriptionText);
		});

		it('si la description n‘est pas disponible, je ne la vois pas', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({ description: undefined });

			const { queryByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={formationInitialeDetail}
			                                          />, { queries });

			expect(queryByDescriptionTerm('Description')).not.toBeInTheDocument();
		});
	});

	describe('les attendus Parcoursup', () => {
		const attendusParcoursup = 'les attendus Parcoursup';
		it('si les attendus Parcoursup sont disponibles, je les vois', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({ attendusParcoursup: attendusParcoursup });

			const { getByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={formationInitialeDetail}
			                                        />, { queries });

			const description = getByDescriptionTerm('Attendus Parcoursup');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent(attendusParcoursup);
		});

		it('si les attendus Parcoursup ne sont pas disponibles, je ne les vois pas', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({ attendusParcoursup: undefined });

			const { queryByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={formationInitialeDetail}
			                                          />, { queries });

			expect(queryByDescriptionTerm('Attendus Parcoursup')).not.toBeInTheDocument();
		});
	});

	describe('les conditions d‘accès', () => {
		const conditionsAcces = 'les conditions d‘accès';
		it('si les conditions d‘accès sont disponibles, je les vois', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({ conditionsAcces: conditionsAcces });

			const { getByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={formationInitialeDetail}
			                                        />, { queries });

			const description = getByDescriptionTerm('Conditions d‘accès');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent(conditionsAcces);
		});

		it('si les attendus Parcoursup ne sont pas disponibles, je ne les vois pas', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({ conditionsAcces: undefined });

			const { queryByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={formationInitialeDetail}
			                                          />, { queries });

			expect(queryByDescriptionTerm('Conditions d‘accès')).not.toBeInTheDocument();
		});
	});

	describe('la poursuite d‘étude', () => {
		const poursuiteEtudes = 'la poursuite d‘étude';
		it('si la poursuite d‘étude est disponible, je la vois', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({ poursuiteEtudes: poursuiteEtudes });

			const { getByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={formationInitialeDetail}
			                                        />, { queries });

			const description = getByDescriptionTerm('Poursuite d‘études');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent(poursuiteEtudes);
		});

		it('si la poursuite d‘étude n‘est pas disponible, je ne la vois pas', () => {
			const formationInitialeDetail = aFormationInitialeDetailComplete({ poursuiteEtudes: undefined });

			const { queryByDescriptionTerm } = render(<ConsulterDetailFormationInitiale
				formationInitialeDetail={formationInitialeDetail}
			                                          />, { queries });

			expect(queryByDescriptionTerm('Poursuite d‘études')).not.toBeInTheDocument();
		});
	});

	describe('mention explicative formation non documentée Onisep', () => {
		describe('lorsque les informations ne sont pas récupérées du CMS', () => {
			it('affiche la mention explicative', () => {
				const formationInitialeDetail = aFormationInitiale();

				render(<ConsulterDetailFormationInitiale formationInitialeDetail={formationInitialeDetail}/>);

				expect(screen.getByText('L‘ONISEP ne fournit pas de description pour cette formation. Vous pouvez consulter les établissements pour plus d‘informations.')).toBeVisible();
			});
		});

		describe('lorsque les informations sont récupérées du CMS', () => {
			it('n‘affiche pas la mention explicative', () => {
				const formationInitialeDetail = aFormationInitialeDetailComplete();
				render(<ConsulterDetailFormationInitiale formationInitialeDetail={formationInitialeDetail}/>);

				expect(screen.queryByText('L‘ONISEP ne fournit pas de description pour cette formation. Vous pouvez consulter les établissements pour plus d‘informations.')).not.toBeInTheDocument();
			});
		});
	});
});
