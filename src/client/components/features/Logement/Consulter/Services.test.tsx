/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { Services } from '~/client/components/features/Logement/Consulter/Services';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import ServiceInclus = AnnonceDeLogement.ServiceInclus;
import ServiceOptionnel = AnnonceDeLogement.ServiceOptionnel;

describe('<Services />', () => {
	it('affiche les services inclus', async () => {
		const servicesInclus = [
			ServiceInclus.TV,
			ServiceInclus.INTERNET,
		];
		render(<Services inclus={servicesInclus} optionnels={[]} />);

		const [ listeServicesInclus ] = screen.getAllByRole('list');
		const [ TV, Internet ] = within(listeServicesInclus).getAllByRole('listitem');
		expect(TV).toBeVisible();
		expect(Internet).toBeVisible();
	});
	it('affiche les services optionnels', async () => {
		const servicesOptionnels = [
			ServiceOptionnel.TV,
			ServiceOptionnel.INTERNET,
		];
		render(<Services inclus={[]} optionnels={servicesOptionnels} />);

		const [ _, listeServicesOptionnels ] = screen.getAllByRole('list');
		const [ TV, Internet ] = within(listeServicesOptionnels).getAllByRole('listitem');
		expect(TV).toBeVisible();
		expect(Internet).toBeVisible();
	});
});
