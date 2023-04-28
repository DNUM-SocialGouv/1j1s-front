/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'next/router';
import React from 'react';

import { createMockRouter, mockUseRouter } from '~/client/components/useRouter.mock';

import App from './_app.page';

describe('<App />', () => {
	it('focus l’ancre au render', async () => {
		// NOTE (GAFI 25-04-2023): Parce qu'apparemment un NextRouter n'est pas un Router, mais que ça marche quand même
		const router = createMockRouter() as Router;
		mockUseRouter({ asPath: '/test#cible' });
		const Component = Object.assign(
			function Component() {
				return <button id="cible">Cible</button>;
			},
			{ getLayout: (page: React.ReactElement) => <>{page}</> },
		);

		render(<App pageProps={{}} Component={Component} router={router}/>);

		const cible = screen.getByText('Cible');
		await waitFor(() => expect(cible).toHaveFocus());
	});
});
