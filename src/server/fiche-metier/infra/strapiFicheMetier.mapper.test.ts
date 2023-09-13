import { aFicheMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import {
	aStrapiFicheMetier,
} from '~/server/fiche-metier/infra/strapiFicheMetier.fixture';
import { mapFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier.mapper';

describe('mapFicheMetier', () => {
	it('map une fiche metier', () => {
		const ficheMetierMapped = mapFicheMetier(aStrapiFicheMetier());

		expect(ficheMetierMapped).toEqual(aFicheMetier());
	});
});
