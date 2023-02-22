/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';

import AnnonceAlternancePage from '~/pages/apprentissage/[id].page';
import { anAlternanceMatcha } from '~/server/alternances/domain/alternance.fixture';

// NOTE (GAFI 22-02-2023): Mock requis --> https://github.com/vercel/next.js/discussions/11060
function HeadMock({ children }: { children: React.ReactNode }) {
	return <>{ReactDOM.createPortal(children, document.head)}</>;
}
jest.mock('next/head', () => HeadMock);

describe('<AnnonceAlternancePage />', () => {
	it("ajoute le nom de l'annonce au titre du document", async () => {
		const annonce = anAlternanceMatcha({ titre: 'Ma super alternance' });

		render(<AnnonceAlternancePage annonce={annonce} />);

		expect(document.title).toContain('Ma super alternance');
	});
});
