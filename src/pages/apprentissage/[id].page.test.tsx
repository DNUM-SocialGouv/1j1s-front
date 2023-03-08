/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import AnnonceAlternancePage, { DetailAlternanceSerialized } from '~/pages/apprentissage/[id].page';

const annonceAlternanceSerialized: DetailAlternanceSerialized = {
	compétences: ['savoir faire'],
	dateDébut: undefined,
	durée: 10,
	entreprise: {
		localisation: 'paris',
		nom:'une entreprise',
		téléphone: undefined,
	},
	localisation: 'paris',
	niveauRequis: 'débutant',
	titre: 'Ma super alternance',
	typeDeContrat: 'Apprentissage',
};

// NOTE (GAFI 22-02-2023): Mock requis --> https://github.com/vercel/next.js/discussions/11060
function HeadMock({ children }: { children: React.ReactNode }) {
	return <>{ReactDOM.createPortal(children, document.head)}</>;
}
jest.mock('next/head', () => HeadMock);

describe('<AnnonceAlternancePage />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it("ajoute le nom de l'annonce au titre du document", async () => {
		render(<AnnonceAlternancePage annonce={annonceAlternanceSerialized} />);

		expect(document.title).toContain('Ma super alternance');
	});
	it("affiche le détail de l'annonce", async () => {
		render(<AnnonceAlternancePage annonce={annonceAlternanceSerialized} />);

		const titre = screen.getByRole('heading', { level: 1, name: /Ma super alternance/i });
		expect(titre).toBeVisible();
	});
});
