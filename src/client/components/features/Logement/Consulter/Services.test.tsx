/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { Services } from '~/client/components/features/Logement/Consulter/Services';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';

describe('<Services />', () => {
	it('affiche les services inclus', async () => {
		const servicesInclus = [
			AnnonceDeLogement.ServiceInclus.TV,
			AnnonceDeLogement.ServiceInclus.INTERNET,
		];
		render(<Services inclus={servicesInclus} optionels={[]} />);

		const [ listeServicesInclus ] = screen.getAllByRole('list');
		const [ TV, Internet ] = within(listeServicesInclus).getAllByRole('listitem');
		expect(TV).toBeVisible();
		expect(Internet).toBeVisible();
	});
});
