import { aFormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.fixture';
import { FormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.type';
import { mapFormationInitiale } from '~/server/formations-initiales-detail/infra/mapper/formationInitialeDetail.mapper';
import {
	aStrapiFormationInitialeDetail,
} from '~/server/formations-initiales-detail/infra/strapiFormationIntialeDetail.fixture';

describe('formation initiale détail mapper', () => {
	it('map vers le détail d‘une formation initiale', () => {
		const formationInitialeStrapiReponse = aStrapiFormationInitialeDetail();
		const formationExpected: FormationInitialeDetailCMS = aFormationInitialeDetailCMS();

		const formationInitialeMapped = mapFormationInitiale(formationInitialeStrapiReponse);

		expect(formationInitialeMapped).toStrictEqual(formationExpected);
	});
});
