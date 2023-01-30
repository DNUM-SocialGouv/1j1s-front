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
	it('affiche une section', async () => {
		render(<Services inclus={[]} optionnels={[]} />);

		const section = screen.getByRole('region', { name: /Équipements et services/i });
		expect(section).toBeVisible();
	});
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
	it('affiche le titre des services inclus', async () => {
		const servicesInclus = [
			ServiceInclus.TV,
			ServiceInclus.INTERNET,
		];
		render(<Services inclus={servicesInclus} optionnels={[]} />);

		const heading = screen.getByRole('heading', { level: 2, name: /Équipements et services inclus/i });

		expect(heading).toBeVisible();
	});
	it('affiche le titre des services optionnels', async () => {
		const servicesOptionnels = [
			ServiceOptionnel.TV,
			ServiceOptionnel.INTERNET,
		];
		render(<Services inclus={[]} optionnels={servicesOptionnels} />);

		const heading = screen.getByRole('heading', { level: 2, name: /Équipements et services optionnels/i });

		expect(heading).toBeVisible();
	});
	it('n\'affiche pas le service "Non renseigné"', async () => {
		const servicesOptionnels = [
			ServiceOptionnel.NON_RENSEIGNE,
		];
		const servicesInclus = [
			ServiceInclus.NON_RENSEIGNE,
		];
		render(<Services inclus={servicesInclus} optionnels={servicesOptionnels} />);

		const items = screen.queryAllByRole('listitem');

		expect(items).toHaveLength(0);
	});
	it('affiche un message si aucun service inclus ou optionnel', async () => {
		render(<Services inclus={[]} optionnels={[]} />);

		const messagesServicesInclus = screen.getByText(/Aucun service inclus/i);
		const messagesServicesOptionnels = screen.getByText(/Aucun service optionnel/i);

		expect(messagesServicesInclus).toBeVisible();
		expect(messagesServicesOptionnels).toBeVisible();
	});
});
