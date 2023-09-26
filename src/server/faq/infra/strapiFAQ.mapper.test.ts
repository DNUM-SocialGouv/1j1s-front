/**
 * @jest-environment jsdom
 */

import { aQuestion, aQuestionRéponse, aStrapiQuestion } from '~/server/faq/domain/FAQ.fixture';
import { flatMapSlug, mapQuestion, mapQuestionRéponse } from '~/server/faq/infra/strapiFAQ.mapper';

describe('mapQuestion', () => {
	it('retourne le résultat formaté', () => {
		const result= mapQuestion(aStrapiQuestion({
			contenu: 'mon contenu explicatif',
			problematique: 'Comment constituer un dossier locatif ?',
			slug: 'Comment-constituer-un-dossier-locatif-?',
		}));

		expect(result).toStrictEqual(aQuestion({
			problématique: 'Comment constituer un dossier locatif ?',
			slug: 'Comment-constituer-un-dossier-locatif-?',
		}));
	});
});

describe('mapQuestionRéponse', () => {
	it('retourne le résultat formaté', () => {
		const result = mapQuestionRéponse(aStrapiQuestion({
			contenu: 'mon contenu explicatif',
			problematique: 'Comment constituer un dossier locatif ?',
			slug: 'Comment-constituer-un-dossier-locatif-?',
		}));

		expect(result).toStrictEqual(aQuestionRéponse({
			contenu: 'mon contenu explicatif',
			problématique: 'Comment constituer un dossier locatif ?',
			slug: 'Comment-constituer-un-dossier-locatif-?',
		}));
	});
});

describe('flatMapSlug', () => {
	it('renvoie le slug', () => {
		const result= flatMapSlug(aStrapiQuestion({
			contenu: 'mon contenu explicatif',
			problematique: 'Comment constituer un dossier locatif ?',
			slug: 'Comment-constituer-un-dossier-locatif-?',
		}));

		expect(result).toEqual('Comment-constituer-un-dossier-locatif-?');
	});
});
