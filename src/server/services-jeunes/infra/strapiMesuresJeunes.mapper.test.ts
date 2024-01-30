// TODO (BRUJ 30/01/2024): rajouter les tests sur le mapper

it('retourne la liste des services jeunes triée alphabétiquement dans le titre', async () => {
	const cmsRepository = aStrapiCmsRepository();
	cmsRepository.getServiceJeuneList = jest.fn().mockResolvedValue(createSuccess(anUnorderedServiceJeuneList()));
	const listerServicesJeunesUseCase = new ListerServicesJeunesUseCase(cmsRepository);

	const result = await listerServicesJeunesUseCase.handle();

	expect(result).toEqual(createSuccess(aServiceJeuneList()));
});

it('retourne la liste des services jeunes sans aides financières', async () => {
	const cmsRepository = aStrapiCmsRepository();
	cmsRepository.getServiceJeuneList = jest.fn().mockResolvedValue(createSuccess([aServiceJeune({ categorie: ServiceJeune.Categorie.AIDES_FINANCIERES })]));
	const listerServicesJeunesUseCase = new ListerServicesJeunesUseCase(cmsRepository);

	const result = await listerServicesJeunesUseCase.handle();

	expect(result).toEqual(createSuccess([]));
