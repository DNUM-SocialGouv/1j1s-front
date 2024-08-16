import 'html-validate/jest';

import { buildQueries, getAllByRole, getNodeText } from '@testing-library/dom';
import { act, within } from '@testing-library/react';
import { AxeResults } from 'axe-core';
import { axe, toHaveNoViolations } from 'jest-axe';

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeAccessible(): Promise<R>
		}
	}
}

expect.extend(toHaveNoViolations);

function getTerms(container: HTMLElement, name: string | RegExp) {
	const terms = getAllByRole(container, 'term');
	// NOTE (GAFI 22-02-2023): filter instead of find because nothing forbids
	// 	the same term from appearing multiple times in the list
	return terms.filter(
		(term) => (
			typeof name === 'string'
				? getNodeText(term) === name
				: name.test(getNodeText(term))
		),
	);
}

function isDefinition(element: Element) {
	const definitions = within(element.parentElement as HTMLElement).getAllByRole('definition');
	return definitions.find((currentElement) => currentElement === element) != null;
}

function getDescriptionForTerm(term: HTMLElement) {
	let currentElement: Element | null = term;
	while (currentElement && !isDefinition(currentElement)) {
		currentElement = currentElement.nextElementSibling;
	}
	const descriptions = [];
	while (currentElement && isDefinition(currentElement)) {
		descriptions.push(currentElement);
		currentElement = currentElement.nextElementSibling;
	}
	return descriptions;
}

const queryAllByDescriptionTerm = (container: HTMLElement, name: string | RegExp) => {
	const terms = getTerms(container, name);

	const definitions = terms.flatMap(getDescriptionForTerm);

	return definitions as HTMLElement[];
};

expect.extend({
	toBeAccessible: async (htmlElement: HTMLElement) => {
		// NOTE (SULI 04-09-2023): l'appel à jest-axe fait évoluer un state du next/link
		// il faut attendre que tout le code de axe soit exécuté pour éviter les console.error sur les tests des pages utilisant un lien
		const results = await act(async () => await axe(htmlElement, {
			elementRef: true,
		}));

		// FIXME (BRUJ 07/08/2024): Les tests d'accessibilités sur le select sont en erreur à cause d'un faux positif sur les noms
		//  accessibles des boutons avec le role combobox, en attente de correction de la part de axe nous avons supprimé la règle en question
		//  penser à supprimer elementRef: true qui sert a acceder aux nodes elements cf https://github.com/dequelabs/axe-core/issues/4472
		return toHaveNoViolations.toHaveNoViolations(axeIgnoreRule(results, 'button-name', 'button[role="combobox"]'));
	},
});

const [
	queryByDescriptionTerm,
	getAllByDescriptionTerm,
	getByDescriptionTerm,
	findAllByDescriptionTerm,
	findByDescriptionTerm,
] = buildQueries(
	queryAllByDescriptionTerm,
	(c, name) => `Found multiple descriptions from term with name of ${name}`,
	(c, name) => `Unable to find a description from term with name of ${name}`,
);

const queries = {
	findAllByDescriptionTerm,
	findByDescriptionTerm,
	getAllByDescriptionTerm,
	getByDescriptionTerm,
	queryAllByDescriptionTerm,
	queryByDescriptionTerm,
};

export {
	queries,
};


function axeIgnoreRule(results: AxeResults, ruleName: string, cssSelector: string) {
	const violations = results.violations.map((violation) => {
		if (violation.id !== ruleName) {
			return violation;
		}

		const remainingViolations = violation.nodes.filter((node) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return !node.element.matches(cssSelector);
		});

		if (remainingViolations.length === 0) {
			return null;
		}

		return { ...violation, nodes: remainingViolations };
	}).filter((violation) => violation !== null);

	return { ...results, violations };
}
