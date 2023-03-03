import { buildQueries, getAllByRole, getNodeText } from '@testing-library/dom';
import { within } from '@testing-library/react';

function getTerms(container: HTMLElement, name: string) {
	const terms = getAllByRole(container, 'term');
	// NOTE (GAFI 22-02-2023): filter instead of find because nothing forbids
	// 	the same term from appearing multiple times in the list
	return terms.filter(
		(term) => getNodeText(term) === name,
	);
}

function isDefinition(element: Element) {
	const definitions = within(element.parentElement).getAllByRole('definition');
	return definitions.find((currentElement) => currentElement === element) != null;
}

function getDescriptionForTerm(term: HTMLElement) {
	let currentElement: Element | null = term;
	while (currentElement && !isDefinition(currentElement)) {
		currentElement = currentElement.nextElementSibling;
	}
	const descriptions = [];
	while(currentElement && isDefinition(currentElement)) {
		descriptions.push(currentElement);
		currentElement = currentElement.nextElementSibling;
	}
	return descriptions;
}

const queryAllByDescriptionTerm = (container: HTMLElement, name: string) => {
	const terms = getTerms(container, name);

	const definitions = terms.flatMap(getDescriptionForTerm);

	return definitions as HTMLElement[];
};

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

export {
	findAllByDescriptionTerm,
	findByDescriptionTerm,
	getAllByDescriptionTerm,
	getByDescriptionTerm,
	queryAllByDescriptionTerm,
	queryByDescriptionTerm,
};
