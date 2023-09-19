/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { TagList } from '~/client/components/ui/Tag/TagList';


describe('TagList', () => {
	it('Affiche la liste de tag', () => {
		render(<TagList list={['element 1', 'element 2']}/>);

		const tags = screen.getAllByRole('listitem');
		expect(tags).toHaveLength(2);
		expect(tags[0]).toHaveTextContent('element 1');
		expect(tags[1]).toHaveTextContent('element 2');
	});

	it('Supprime les éléments undefined', () => {
		render(<TagList list={['element 1', undefined, 'element 2']}/>);

		const tags = screen.getAllByRole('listitem');
		expect(tags).toHaveLength(2);
		expect(tags[0]).toHaveTextContent('element 1');
		expect(tags[1]).toHaveTextContent('element 2');
	});
});
