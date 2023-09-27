import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess } from '~/server/errors/either';
import { mapFormationInitiale } from '~/server/formations-initiales-detail/infra/formationInitialeDetail.mapper';

import { aFormationInitialeDetailCMS } from './formationInitiale.fixture';
import {
	StrapiFormationInitialeDetailRepository,
} from './strapiFormationInitialeDetail.repository';
import {
	aStrapiFormationInitialeDetail,
} from './strapiFormationIntialeDetail.fixture';

describe('StrapiFormationInitialeDetailRepository', () => {
	it('appelle le service Strapi avec les bon paramètres', async () => {
		// GIVEN
		const strapiCmsRepository = aStrapiCmsRepository();
		const strapiFormationInitialeDetailRepository = new StrapiFormationInitialeDetailRepository(strapiCmsRepository);
		const identifiant = 'FOR.1234';
		const formationInitialeDetailResourceName = 'formation-initiale-details';
		const strapiQuery = 'filters[identifiant][$eq]=FOR.1234';

		// WHEN
		await strapiFormationInitialeDetailRepository.getFormationInitialeById(identifiant);

		// THEN
		expect(strapiCmsRepository.getFirstFromCollectionType).toHaveBeenCalledWith(formationInitialeDetailResourceName, strapiQuery, mapFormationInitiale);
	});

	it('retourne le détail de la formation initiale', async () => {
		// GIVEN
		const strapiCmsRepository = aStrapiCmsRepository();
		jest.spyOn(strapiCmsRepository, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiFormationInitialeDetail()));
		const strapiFormationInitialeDetailRepository = new StrapiFormationInitialeDetailRepository(strapiCmsRepository);
		const identifiant = 'FOR.1234';
		const expectedFormationInitialeDetail = aFormationInitialeDetailCMS();

		// WHEN
		const formationInitialeDetail = await strapiFormationInitialeDetailRepository.getFormationInitialeById(identifiant);

		// THEN
		expect(formationInitialeDetail).toStrictEqual(expectedFormationInitialeDetail);
	});
});
