/**
 * @jest-environment jsdom
 */

import { queries as defaultQueries,render, screen, within } from '@testing-library/react';
import React from 'react';

import * as queries from './test-utils';

describe('getByDescriptionTerm', () => {
	it('match une description unique à un terme unique', () => {
		const { getByDescriptionTerm } = render(
			<dl>
				<dt>Terme</dt>
				<dd>Description</dd>
			</dl>,
			{ queries },
		);

		const description = getByDescriptionTerm('Terme');
		expect(description).toHaveTextContent('Description');
	});
	it('match une description unique à plusieurs termes', () => {
		const { getByDescriptionTerm } = render(
			<dl>
				<dt>Terme1</dt>
				<dt>Terme2</dt>
				<dd>Description</dd>
			</dl>,
			{ queries },
		);

		const description1 = getByDescriptionTerm('Terme1');
		const description2 = getByDescriptionTerm('Terme2');
		expect(description1).toHaveTextContent('Description');
		expect(description2).toHaveTextContent('Description');
	});
	it('match plusieurs descriptions à un terme unique', () => {
		const { getAllByDescriptionTerm } = render(
			<dl>
				<dt>Terme</dt>
				<dd>Description1</dd>
				<dd>Description2</dd>
			</dl>,
			{ queries },
		);

		const description = getAllByDescriptionTerm('Terme');
		expect(description[0]).toHaveTextContent('Description1');
		expect(description[1]).toHaveTextContent('Description2');
	});
	it('match plusieurs descriptions à un terme qui apparait plusieurs fois dans la liste', () => {
		const { getAllByDescriptionTerm } = render(
			<dl>
				<dt>Terme</dt>
				<dd>Description1</dd>
				<dt>Terme</dt>
				<dd>Description2</dd>
			</dl>,
			{ queries },
		);

		const description = getAllByDescriptionTerm('Terme');
		expect(description[0]).toHaveTextContent('Description1');
		expect(description[1]).toHaveTextContent('Description2');
	});
	it('match n’importe quel balise avec le role term', () => {
		const { getAllByDescriptionTerm } = render(
			<dl>
				<div role="term">Terme</div>
				<dd>Description</dd>
			</dl>,
			{ queries },
		);

		const description = getAllByDescriptionTerm('Terme');
		expect(description[0]).toHaveTextContent('Description');
	});
	it('match n’importe quel balise avec le role definition', () => {
		const { getByDescriptionTerm } = render(
			<dl>
				<dt>Terme</dt>
				<div role="definition">Description</div>
			</dl>,
			{ queries },
		);

		const description = getByDescriptionTerm('Terme');
		expect(description).toHaveTextContent('Description');
	});
	it('match plusieurs descriptions sur plusieurs listes', () => {
		const { getAllByDescriptionTerm } = render(
			<>
				<dl>
					<dt>Terme</dt>
					<dd>Description1</dd>
				</dl>
				<dl>
					<dt>Terme</dt>
					<dd>Description2</dd>
				</dl>
			</>,
			{ queries },
		);

		const descriptions = getAllByDescriptionTerm('Terme');
		expect(descriptions[0]).toHaveTextContent('Description1');
		expect(descriptions[1]).toHaveTextContent('Description2');
	});
	it('match depuis le container', () => {
		render(
			<>
				<dl>
					<dt>Terme</dt>
					<dd>Description1</dd>
				</dl>
				<dl>
					<dt>Terme</dt>
					<dd>Description2</dd>
				</dl>
			</>,
		);

		const listes = screen.getAllByText((content, element) => element?.tagName === 'DL');
		const descriptions = within(listes[0], { ...queries, ...defaultQueries })
			.getAllByDescriptionTerm('Terme');
		expect(descriptions[0]).toHaveTextContent('Description1');
		expect(descriptions).toHaveLength(1);
	});
});
