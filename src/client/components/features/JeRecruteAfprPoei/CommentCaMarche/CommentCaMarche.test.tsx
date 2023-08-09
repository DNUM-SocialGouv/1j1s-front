/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { CommentCaMarche } from '~/client/components/features/JeRecruteAfprPoei/CommentCaMarche/CommentCaMarche';

describe('CommentCaMarche', () => {

	it('Je vois le titre', () => {
		render(<CommentCaMarche/>);
		expect(screen.getByRole('heading', { level: 2, name:'Comment ça marche ?' })).toBeVisible();
	});
	it('je vois la liste des explications', () => {
		render(<CommentCaMarche/>)
		expect(screen.getByRole('list')).toBeVisible()
		expect(screen.getAllByRole('listitem')).toHaveLength(5)
	});
});
