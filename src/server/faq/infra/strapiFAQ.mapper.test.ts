import { aQuestion, aQuestionEtReponse } from '~/server/faq/domain/FAQ.fixture';
import { aStrapiQuestion, aStrapiQuestionEtReponse } from '~/server/faq/infra/strapiFAQ.fixture';
import { mapQuestion, mapQuestionReponse } from '~/server/faq/infra/strapiFAQ.mapper';

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

describe('mapQuestionReponse', () => {
	it('retourne le résultat formaté', () => {
		const result = mapQuestionReponse(aStrapiQuestionEtReponse({
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
