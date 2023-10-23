import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aFormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.fixture';
import {
	aStrapiFormationInitialeDetail,
} from '~/server/formations-initiales-detail/infra/strapiFormationIntialeDetail.fixture';

import { StrapiFormationInitialeDetailRepository } from './strapiFormationInitialeDetail.repository';

describe('StrapiFormationInitialeDetailRepository', () => {
	it('appelle le service Strapi avec les bons paramètres', async () => {
		// GIVEN
		const strapiService = aStrapiCmsRepository();
		const strapiFormationInitialeDetailRepository = new StrapiFormationInitialeDetailRepository(strapiService);
		const identifiant = 'FOR.1234';
		const formationInitialeDetailResourceName = 'formation-initiale-details';
		const strapiQuery = 'filters[identifiant][$eq]=FOR.1234';

		// WHEN
		await strapiFormationInitialeDetailRepository.getFormationInitialeById(identifiant);

		// THEN
		expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(formationInitialeDetailResourceName, strapiQuery);
	});

	it('quand le service répond en succès, retourne le détail de la formation initiale', async () => {
		// GIVEN
		const strapiService = aStrapiCmsRepository();
		jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiFormationInitialeDetail()));
		const strapiFormationInitialeDetailRepository = new StrapiFormationInitialeDetailRepository(strapiService);
		const identifiant = 'FOR.1234';
		const expectedFormationInitialeDetail = aFormationInitialeDetailCMS();

		// WHEN
		const formationInitialeDetail = await strapiFormationInitialeDetailRepository.getFormationInitialeById(identifiant);

		// THEN
		expect(formationInitialeDetail).toStrictEqual(createSuccess(expectedFormationInitialeDetail));
	});

	it('quand le service répond en échec, relais l’erreur du service', async () => {
		// GIVEN
		const strapiService = aStrapiCmsRepository();
		const failureStrapi = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
		jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(failureStrapi);
		const strapiFormationInitialeDetailRepository = new StrapiFormationInitialeDetailRepository(strapiService);
		const identifiant = 'FOR.1234';

		// WHEN
		const formationInitialeDetail = await strapiFormationInitialeDetailRepository.getFormationInitialeById(identifiant);

		// THEN
		expect(formationInitialeDetail).toStrictEqual(failureStrapi);
	});
});
