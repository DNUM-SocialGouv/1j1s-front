import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess } from '~/server/errors/either';
import { aFormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.fixture';
import { mapFormationInitiale } from '~/server/formations-initiales-detail/infra/mapper/formationInitialeDetail.mapper';

import { StrapiFormationInitialeDetailRepository } from './strapiFormationInitialeDetail.repository';

describe('StrapiFormationInitialeDetailRepository', () => {
	it('appelle le service Strapi avec les bon paramètres', async () => {
		// GIVEN
		const strapiService = aStrapiCmsRepository();
		const strapiFormationInitialeDetailRepository = new StrapiFormationInitialeDetailRepository(strapiService);
		const identifiant = 'FOR.1234';
		const formationInitialeDetailResourceName = 'formation-initiale-details';
		const strapiQuery = 'filters[identifiant][$eq]=FOR.1234';

		// WHEN
		await strapiFormationInitialeDetailRepository.getFormationInitialeById(identifiant);

		// THEN
		expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(formationInitialeDetailResourceName, strapiQuery, mapFormationInitiale);
	});

	it('retourne le détail de la formation initiale', async () => {
		// GIVEN
		const strapiService = aStrapiCmsRepository();
		jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aFormationInitialeDetailCMS()));
		const strapiFormationInitialeDetailRepository = new StrapiFormationInitialeDetailRepository(strapiService);
		const identifiant = 'FOR.1234';
		const expectedFormationInitialeDetail = aFormationInitialeDetailCMS();

		// WHEN
		const formationInitialeDetail = await strapiFormationInitialeDetailRepository.getFormationInitialeById(identifiant);

		// THEN
		expect(formationInitialeDetail).toStrictEqual(createSuccess(expectedFormationInitialeDetail));
	});
});
