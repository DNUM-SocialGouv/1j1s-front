/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	RésultatRechercherFormation,
} from '~/client/components/features/Formation/Résultat/RésultatRechercherFormation';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { NiveauRequis } from '~/server/formations/domain/formation';

describe('RésultatRechercherFormation', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	it('affiche une carte formation avec un résumé', async () => {
		const formation = {
			adresse: '1 rue de la République',
			nomEntreprise: 'La Bonne Alternance',
			tags: ['Paris', NiveauRequis['NIVEAU_5']],
			titre: 'Développeur web',
		};
		const logo = '/images/logos/fallback.svg';

		render(
			<RésultatRechercherFormation
				intituléOffre={formation.titre}
				lienOffre={'#'}
				logoEntreprise={logo}
				nomEntreprise={formation.nomEntreprise}
				étiquetteOffreList={formation.tags as string[]}
				adresse={formation.adresse}
			/>,
		);

		const étiquettesFormationList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
		const lienVersFormation = screen.getByRole('link');
		const intituléFormation = screen.getByRole('heading', { level: 3 });
		const adresseFormation = await screen.findByText(`Adresse : ${formation.adresse}`);

		expect(within(étiquettesFormationList).queryAllByRole('listitem')).toHaveLength(formation.tags.length);
		expect(lienVersFormation).toHaveAttribute('href', '#');
		expect(intituléFormation.textContent).toEqual(formation.titre);
		expect(adresseFormation).toBeInTheDocument();
	});
});
