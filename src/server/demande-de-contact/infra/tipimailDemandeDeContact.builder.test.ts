import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/DemandeDeContact.fixture';
import { buildDemandeDeContactApiTipimail } from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.builder';
import { aDemandeDeContactTipimail } from '~/server/envoie-email/domain/DemandeDeContactTipimail.fixture';

describe('TipimailDemandeDeContactBuilder', () => {
  describe('buildDemandeDeContactApiTipimail', () => {
    it('construit l’email à envoyer', () => {
      // Given
      const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();

      // When
      const result = buildDemandeDeContactApiTipimail(demandeDeContactAccompagnement);

      // Then
      expect(result).toEqual(aDemandeDeContactTipimail());
    });
  });
});
