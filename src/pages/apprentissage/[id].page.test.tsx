/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import AnnonceAlternancePage from '~/pages/apprentissage/[id].page';
import { anAlternanceMatcha } from '~/server/alternances/domain/alternance.fixture';

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
		const annonce = anAlternanceMatcha({ titre: 'Ma super alternance' });

		render(<AnnonceAlternancePage annonce={annonce} />);

		expect(document.title).toContain('Ma super alternance');
	});
	it("affiche le détail de l'annonce", async () => {
		const annonce = anAlternanceMatcha({ titre: 'Ma super alternance' });

		render(<AnnonceAlternancePage annonce={annonce} />);

		const titre = screen.getByRole('heading', { level: 1, name: /Ma super alternance/i });
		expect(titre).toBeVisible();
	});
});
