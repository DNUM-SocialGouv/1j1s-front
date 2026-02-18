import { anOffreÉchantillonAvecLocalisationEtMotCléFiltre } from '~/server/offres/domain/offre.fixture';
import {
	aApiFranceTravailReferentielRepository,
} from '~/server/offres/infra/repositories/france-travail/apiFranceTravailReferentiel.repository.fixture';
import {
	FranceTravailParametreBuilderService,
} from '~/server/offres/infra/repositories/france-travail/franceTravailParametreBuilder.service';

describe('franceTravailParametreBuilder.service', () => {
	const apiFranceTravailReferentielRepository = aApiFranceTravailReferentielRepository();

	describe('buildCommonParamètresRecherche', () => {
		it('retourne les paramètres communs au recherche de l’api France Travail', async () => {
			vi
				.spyOn(apiFranceTravailReferentielRepository, 'findCodeInseeInRéférentielCommune')
				.mockResolvedValue('75101');

			const result = await new FranceTravailParametreBuilderService(apiFranceTravailReferentielRepository).buildCommonParamètresRecherche(anOffreÉchantillonAvecLocalisationEtMotCléFiltre());

			expect(result).toEqual('commune=75101&motsCles=boulanger&range=0-14');
		});
	});
});
