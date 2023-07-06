/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { OffreDeStage } from '~/client/components/features/OffreDeStage/OffreDeStage';
import {
	aLocalisationStageIndexee,
	anOffreDeStageIndexee,
} from '~/client/components/features/OffreDeStage/offreDeStageIndexee.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { Domaines } from '~/server/cms/domain/offreDeStage.type';

describe('Une carte d’offre de stage affiche des étiquettes', () => {

	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	function someDummy() {
		return;
	}

	describe('concernant les domaines du stage', () => {
		it('un domaine "Non renseigné" n’est pas affiché', () => {
			const displayedDomain = Domaines.MAINTENANCE;
			const displayedFormattedDomain = 'Qualité / Maintenance';
			const offreStage = anOffreDeStageIndexee({ domaines: [displayedDomain, Domaines.NON_RENSEIGNE] });

			render(
				<OffreDeStage
					hit={offreStage}
					sendEvent={someDummy}
				/>,
			);

			const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
			expect(displayedTagsTextContents).toContain(displayedFormattedDomain);
			expect(displayedTagsTextContents).not.toContain('Non Renseigné');
		});
	});

	describe('concernant la localisation du stage', () => {
		it('si la ville est connue, affiche la ville', () => {
			const localisationWithCity = aLocalisationStageIndexee({ ville: 'Paris' });

			const offreStage = anOffreDeStageIndexee({ localisation: localisationWithCity });

			render(
				<OffreDeStage
					hit={offreStage}
					sendEvent={someDummy}
				/>,
			);

			const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
			expect(displayedTagsTextContents).toContain(localisationWithCity.ville);
		});
		it('si la ville n’est pas connue, mais le département est connue, affiche le département', () => {
			const localisationWithDepartment = aLocalisationStageIndexee({ departement: 'Val de marne', ville: undefined });

			const offreStage = anOffreDeStageIndexee({ localisation: localisationWithDepartment });

			render(
				<OffreDeStage
					hit={offreStage}
					sendEvent={someDummy}
				/>,
			);

			const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
			expect(displayedTagsTextContents).toContain(localisationWithDepartment.departement);
		});
		it('si ni la ville, ni le département ne sont connus, mais que la région est connue, affiche la région', () => {
			const localisationWithRegion = aLocalisationStageIndexee({ departement: undefined, region: 'Ile de France', ville: undefined });

			const offreStage = anOffreDeStageIndexee({ localisation: localisationWithRegion });

			render(
				<OffreDeStage
					hit={offreStage}
					sendEvent={someDummy}
				/>,
			);

			const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
			expect(displayedTagsTextContents).toContain(localisationWithRegion.region);
		});

		// comment je peux tester le cas où quand pas de localisation, aucun tag ?
	});

	describe('concernant la durée du stage', () => {
		it('une durée catégorisée "Non renseignée" n’est pas affichée', () => {
			const offreStage = anOffreDeStageIndexee({ dureeCategorisee: 'Non renseigné' });

			render(
				<OffreDeStage
					hit={offreStage}
					sendEvent={someDummy}
				/>,
			);

			const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
			expect(displayedTagsTextContents).not.toContain('Non renseigné');
		});
	});

	describe('concernant la date de début du stage', () => {
		describe('quand la date de début est une date précise', () => {
			it('la date précise est affichée', () => {
				const datePrecise = '2024-09-01';
				const offreStage = anOffreDeStageIndexee({ dateDeDebutMax: datePrecise, dateDeDebutMin: datePrecise });

				render(
					<OffreDeStage
						hit={offreStage}
						sendEvent={someDummy}
					/>,
				);

				const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
				const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
				expect(displayedTagsTextContents).toContain('Débute le : 9/1/2024');
			});
		});

		describe('quand la date de début est une période de date', () => {
			it('la période de date de début est affichée', () => {
				const datePeriodeDebut = '2024-09-01';
				const datePeriodeFin = '2024-09-30';
				const offreStage = anOffreDeStageIndexee({ dateDeDebutMax: datePeriodeFin, dateDeDebutMin: datePeriodeDebut });

				render(
					<OffreDeStage
						hit={offreStage}
						sendEvent={someDummy}
					/>,
				);

				const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
				const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
				expect(displayedTagsTextContents).toContain('Débute entre le : 9/1/2024 et 9/30/2024');
			});
		});
	});

	describe('quand il n’y a aucune information concernant les domaines, la localisation, la durée categorisée', () => {
		it('n’affiche aucune étiquettes les concernant, seule la date de début est affichée', () => {
			const offreStage = anOffreDeStageIndexee({
				domaines: [],
				dureeCategorisee: undefined,
				localisation: aLocalisationStageIndexee({
					departement: undefined,
					region: undefined,
					ville: undefined,
				}),
			});

			render(
				<OffreDeStage
					hit={offreStage}
					sendEvent={someDummy}
				/>,
			);

			const displayedTagsList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
			const displayedTagsTextContents = within(displayedTagsList).queryAllByRole('listitem').map((listItem) => listItem.textContent);
			expect(displayedTagsTextContents).toHaveLength(1);
			expect(displayedTagsTextContents[0]).toBe('Débute le : 9/1/2024');
		});
	});
});
