import {
	aQuestion,
	aQuestionEtReponse,
	aStrapiQuestion,
	aStrapiQuestionEtReponse,
} from '~/server/faq/domain/FAQ.fixture';
import { flatMapSlug, mapQuestion, mapQuestionRéponse } from '~/server/faq/infra/strapiFAQ.mapper';

describe('mapQuestion', () => {
	it('retourne le résultat formaté', () => {
		const result= mapQuestion(aStrapiQuestion({
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
		const result = mapQuestionRéponse(aStrapiQuestionEtReponse({
			contenu: 'mon contenu explicatif',
			problematique: 'Comment constituer un dossier locatif ?',
			slug: 'Comment-constituer-un-dossier-locatif-?',
		}));

		expect(result).toStrictEqual(aQuestionEtReponse({
			contenu: 'mon contenu explicatif',
			problématique: 'Comment constituer un dossier locatif ?',
			slug: 'Comment-constituer-un-dossier-locatif-?',
		}));
	});
});

describe('flatMapSlug', () => {
	it('renvoie le slug', () => {
		const result= flatMapSlug({
			slug: 'Comment-constituer-un-dossier-locatif-?',
		});

		expect(result).toEqual('Comment-constituer-un-dossier-locatif-?');
	});
});
